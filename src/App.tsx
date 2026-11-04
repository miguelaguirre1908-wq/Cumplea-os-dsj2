import React, { useState, useEffect, useMemo } from 'react';
import { BirthdayPerson, GoogleFormsSettings } from './types';
import { MONTHS_DATA } from './data/initialBirthdays';
import {
  loadBirthdays,
  saveBirthdays,
  resetBirthdaysToDefault,
  loadFormsConfig,
  saveFormsConfig,
} from './utils/storage';
import { getDaysUntilBirthday, exportToICS, triggerBigCelebration } from './utils/dateUtils';
import { Navbar } from './components/Navbar';
import { NextBirthdayBanner } from './components/NextBirthdayBanner';
import { MonthSelector } from './components/MonthSelector';
import { SearchAndFilterBar } from './components/SearchAndFilterBar';
import { MonthSection } from './components/MonthSection';
import { BirthdayCard } from './components/BirthdayCard';
import { RegisterFormsModal } from './components/RegisterFormsModal';
import { AddEditModal } from './components/AddEditModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { ShareWhatsAppModal } from './components/ShareWhatsAppModal';
import { GoogleFormsConfigModal } from './components/GoogleFormsConfigModal';
import { MobileBottomBar } from './components/MobileBottomBar';
import { MobileMonthSheet } from './components/MobileMonthSheet';
import { MobileMoreModal } from './components/MobileMoreModal';
import { Sparkles, Cake, UserPlus, Users, Cloud, Check } from 'lucide-react';
import {
  subscribeToBirthdays,
  saveBirthdayToFirestore,
  deleteBirthdayFromFirestore,
  resetBirthdaysInFirestore,
} from './firebase';

export default function App() {
  const [people, setPeople] = useState<BirthdayPerson[]>([]);
  const [formsConfig, setFormsConfig] = useState<GoogleFormsSettings>(loadFormsConfig());
  const [selectedMonth, setSelectedMonth] = useState<number | 'all' | 'upcoming'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'day' | 'name' | 'soonest'>('day');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modals state
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<BirthdayPerson | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingPerson, setDeletingPerson] = useState<BirthdayPerson | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isFormsConfigOpen, setIsFormsConfigOpen] = useState(false);
  const [isMobileMonthSheetOpen, setIsMobileMonthSheetOpen] = useState(false);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Initialize: load local cache for instant paint, then subscribe to Firestore real-time updates
  useEffect(() => {
    const loaded = loadBirthdays();
    setPeople(loaded);

    // Real-time synchronization across all devices
    const unsubscribe = subscribeToBirthdays(
      (cloudPeople) => {
        setPeople(cloudPeople);
        saveBirthdays(cloudPeople);
      },
      (error) => {
        console.warn('Real-time sync notice, using local cache:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  const updatePeople = (newPeople: BirthdayPerson[]) => {
    setPeople(newPeople);
    saveBirthdays(newPeople);
  };

  // Add or Edit person with real-time cloud sync
  const handleSavePerson = async (person: BirthdayPerson) => {
    const exists = people.some((p) => p.id === person.id);
    let updated: BirthdayPerson[];
    if (exists) {
      updated = people.map((p) => (p.id === person.id ? person : p));
    } else {
      updated = [...people, person];
    }
    updatePeople(updated);

    try {
      await saveBirthdayToFirestore(person);
    } catch (err) {
      console.error('Error saving to Firestore:', err);
    }
  };

  // Register from Forms with real-time cloud sync
  const handlePersonRegistered = async (newPerson: BirthdayPerson) => {
    const updated = [...people, newPerson];
    updatePeople(updated);

    try {
      await saveBirthdayToFirestore(newPerson);
    } catch (err) {
      console.error('Error syncing new registration to Firestore:', err);
    }
  };

  // Delete person with password protection and cloud sync
  const handleDeletePerson = (person: BirthdayPerson) => {
    setDeletingPerson(person);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (deletingPerson) {
      const idToDelete = deletingPerson.id;
      const updated = people.filter((p) => p.id !== idToDelete);
      updatePeople(updated);
      setIsDeleteOpen(false);
      setDeletingPerson(null);

      try {
        await deleteBirthdayFromFirestore(idToDelete);
      } catch (err) {
        console.error('Error deleting from Firestore:', err);
      }
    }
  };

  // Edit person
  const handleEditPerson = (person: BirthdayPerson) => {
    setEditingPerson(person);
    setIsAddEditOpen(true);
  };

  // Reset to default list (protected with admin password modal & synced to Firestore)
  const handleResetDefaults = () => {
    setIsResetConfirmOpen(true);
  };

  const confirmResetDefaults = async () => {
    const def = resetBirthdaysToDefault();
    setPeople(def);
    setIsResetConfirmOpen(false);
    triggerBigCelebration();

    try {
      await resetBirthdaysInFirestore();
    } catch (err) {
      console.error('Error resetting in Firestore:', err);
    }
  };

  // Focus search input smoothly
  const handleFocusSearch = () => {
    const input = document.getElementById('main-search-input');
    if (input) {
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      input.focus();
    }
  };

  // Filter & Sort computation
  const filteredPeople = useMemo(() => {
    let result = [...people];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.alias && p.alias.toLowerCase().includes(q)) ||
          (p.customNote && p.customNote.toLowerCase().includes(q))
      );
    }

    // Filter by month or upcoming
    if (selectedMonth === 'upcoming') {
      result = result
        .map((p) => ({ ...p, ...getDaysUntilBirthday(p.month, p.day) }))
        .sort((a, b) => a.daysLeft - b.daysLeft)
        .slice(0, 8);
      return result;
    } else if (selectedMonth !== 'all') {
      result = result.filter((p) => p.month === selectedMonth);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
      }
      if (sortBy === 'soonest') {
        const daysA = getDaysUntilBirthday(a.month, a.day).daysLeft;
        const daysB = getDaysUntilBirthday(b.month, b.day).daysLeft;
        return daysA - daysB;
      }
      // Default: sort by month first, then day
      if (a.month !== b.month) return a.month - b.month;
      return a.day - b.day;
    });

    return result;
  }, [people, searchQuery, selectedMonth, sortBy]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C2621] flex flex-col selection:bg-[#EBDDCF]">
      {/* Top Navigation */}
      <Navbar
        totalCount={people.length}
        onOpenRegisterForm={() => setIsRegisterOpen(true)}
        onOpenAddModal={() => {
          setEditingPerson(null);
          setIsAddEditOpen(true);
        }}
        onOpenShareModal={() => setIsShareOpen(true)}
        onOpenFormsConfig={() => setIsFormsConfigOpen(true)}
        onExportICS={() => exportToICS(people)}
        onResetDefaults={handleResetDefaults}
      />

      {/* Main Content (with bottom padding on mobile to clear bottom nav) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6 pb-28 sm:pb-8">
        {/* Next Birthday Spotlight Banner */}
        <NextBirthdayBanner
          people={people}
          onSelectMonth={(m) => {
            setSelectedMonth(m);
            const el = document.getElementById(`month-${m}`);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Month Selector Pills */}
        <div className="mt-3 sm:mt-4">
          <MonthSelector
            selectedMonth={selectedMonth}
            onSelectMonth={setSelectedMonth}
            people={people}
          />
        </div>

        {/* Search, Sort and Layout Controls */}
        <SearchAndFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Dynamic Display Area */}
        <div className="mt-3 sm:mt-4 min-h-[350px]">
          {filteredPeople.length === 0 ? (
            <div className="p-8 sm:p-12 text-center rounded-3xl bg-[#F6F0E6] border border-[#E2D6C5] my-4 sm:my-6 space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#ECE2D2] text-[#635342] flex items-center justify-center mx-auto">
                <Cake className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#2A231C] font-display">
                  No se encontraron cumpleaños
                </h3>
                <p className="text-xs sm:text-sm text-[#7F7061] mt-1 max-w-md mx-auto">
                  {searchQuery
                    ? `No hay coincidencias para "${searchQuery}". Intenta buscar con otro término.`
                    : 'No hay integrantes en este mes o filtro seleccionado.'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center pt-2">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-2.5 rounded-2xl bg-white border border-[#DDD0BE] text-xs font-semibold text-[#4A3D30] hover:bg-[#EFE8DC] cursor-pointer min-h-[44px]"
                  >
                    Limpiar búsqueda
                  </button>
                )}
                <button
                  onClick={() => setIsRegisterOpen(true)}
                  className="px-5 py-2.5 rounded-2xl bg-[#4A3C31] text-[#FAF6F0] text-xs font-semibold hover:bg-[#382D24] cursor-pointer min-h-[44px]"
                >
                  Registrar mi cumpleaños
                </button>
              </div>
            </div>
          ) : selectedMonth === 'all' && !searchQuery ? (
            /* Grouped Month by Month View */
            <div className="space-y-4">
              {MONTHS_DATA.map((meta) => {
                const monthPeople = people
                  .filter((p) => p.month === meta.month)
                  .sort((a, b) => a.day - b.day);

                return (
                  <MonthSection
                    key={meta.month}
                    monthMeta={meta}
                    people={monthPeople}
                    onEdit={handleEditPerson}
                    onDelete={handleDeletePerson}
                    viewMode={viewMode}
                  />
                );
              })}
            </div>
          ) : selectedMonth === 'upcoming' ? (
            /* Upcoming Spotlight List */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E3D7C5]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#967756]" />
                  <h2 className="text-lg sm:text-xl font-bold text-[#2C241E] font-display">
                    Próximos 8 Cumpleaños
                  </h2>
                </div>
                <span className="text-xs text-[#807061] font-medium">
                  Orden cronológico
                </span>
              </div>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
                  {filteredPeople.map((person) => (
                    <BirthdayCard
                      key={person.id}
                      person={person}
                      onEdit={handleEditPerson}
                      onDelete={handleDeletePerson}
                      viewMode="grid"
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-2.5">
                  {filteredPeople.map((person) => (
                    <BirthdayCard
                      key={person.id}
                      person={person}
                      onEdit={handleEditPerson}
                      onDelete={handleDeletePerson}
                      viewMode="list"
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Single Month or Search Results View */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E3D7C5]">
                <h2 className="text-lg sm:text-xl font-bold text-[#2C241E] font-display">
                  {searchQuery
                    ? `Resultados de búsqueda (${filteredPeople.length})`
                    : MONTHS_DATA.find((m) => m.month === selectedMonth)?.name}
                </h2>
                <span className="text-xs text-[#807061] font-medium">
                  {filteredPeople.length}{' '}
                  {filteredPeople.length === 1 ? 'cumpleañero' : 'cumpleañeros'}
                </span>
              </div>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
                  {filteredPeople.map((person) => (
                    <BirthdayCard
                      key={person.id}
                      person={person}
                      onEdit={handleEditPerson}
                      onDelete={handleDeletePerson}
                      viewMode="grid"
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-2.5">
                  {filteredPeople.map((person) => (
                    <BirthdayCard
                      key={person.id}
                      person={person}
                      onEdit={handleEditPerson}
                      onDelete={handleDeletePerson}
                      viewMode="list"
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#F4EEE4] via-[#FAF8F5] to-[#F1E9DE] border border-[#E3D8C8] flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 shadow-2xs">
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="p-2 rounded-xl bg-[#E8DDD0] text-[#554536]">
                <Users className="w-5 h-5" />
              </span>
              <h3 className="text-base sm:text-xl font-bold text-[#2B231D] font-display">
                ¿Falta algún amigo de Desjuiciados?
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#746556] max-w-xl">
              Cualquier persona puede registrar su fecha y nombre fácilmente. Los datos se guardan en el tablero y quedan disponibles para sincronizar con Google Forms.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto justify-center">
            <button
              onClick={() => setIsRegisterOpen(true)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#4A3C31] text-[#FAF6F0] text-sm font-semibold hover:bg-[#382D24] transition-all shadow-sm active:scale-95 cursor-pointer min-h-[44px]"
            >
              <UserPlus className="w-4 h-4 text-[#D8C7B5]" />
              <span>Registrar Cumpleaños</span>
            </button>
            <button
              onClick={() => setIsShareOpen(true)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white border border-[#DDD1BE] text-sm font-semibold text-[#4A3C31] hover:bg-[#F2ECE1] transition-all cursor-pointer min-h-[44px]"
            >
              <span>Compartir Lista</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#EAE2D5] bg-[#F7F4EE] py-6 sm:py-8 text-xs text-[#7A6C5F] pb-24 sm:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center">
            <Cake className="w-4 h-4 text-[#8C6D4C]" />
            <span className="font-semibold text-[#3C3228]">
              Grupo Desjuiciados • Calendario Oficial de Cumpleaños
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#7A6C5F] justify-center flex-wrap">
            <button
              onClick={() => exportToICS(people)}
              className="hover:text-[#3B3026] hover:underline cursor-pointer min-h-[36px]"
            >
              Descargar Calendario (.ics)
            </button>
            <span>•</span>
            <button
              onClick={() => setIsFormsConfigOpen(true)}
              className="hover:text-[#3B3026] hover:underline cursor-pointer min-h-[36px]"
            >
              Google Forms
            </button>
            <span>•</span>
            <button
              onClick={handleResetDefaults}
              className="hover:text-[#3B3026] hover:underline cursor-pointer min-h-[36px]"
            >
              Restablecer ({people.length})
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomBar
        onOpenMonthSheet={() => setIsMobileMonthSheetOpen(true)}
        onFocusSearch={handleFocusSearch}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
        onOpenMore={() => setIsMobileMoreOpen(true)}
        totalCount={people.length}
      />

      {/* Mobile Month Selection Drawer */}
      <MobileMonthSheet
        isOpen={isMobileMonthSheetOpen}
        onClose={() => setIsMobileMonthSheetOpen(false)}
        selectedMonth={selectedMonth}
        onSelectMonth={setSelectedMonth}
        people={people}
      />

      {/* Mobile More Options Modal */}
      <MobileMoreModal
        isOpen={isMobileMoreOpen}
        onClose={() => setIsMobileMoreOpen(false)}
        onOpenAddModal={() => {
          setEditingPerson(null);
          setIsAddEditOpen(true);
        }}
        onOpenFormsConfig={() => setIsFormsConfigOpen(true)}
        onExportICS={() => exportToICS(people)}
        onResetDefaults={handleResetDefaults}
      />

      {/* Standard Modals */}
      <RegisterFormsModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onPersonRegistered={handlePersonRegistered}
        formsConfig={formsConfig}
      />

      <AddEditModal
        isOpen={isAddEditOpen}
        onClose={() => {
          setIsAddEditOpen(false);
          setEditingPerson(null);
        }}
        onSave={handleSavePerson}
        personToEdit={editingPerson}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setDeletingPerson(null);
        }}
        onConfirm={confirmDelete}
        person={deletingPerson}
      />

      <ResetConfirmModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={confirmResetDefaults}
        currentCount={people.length}
      />

      <ShareWhatsAppModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        people={people}
      />

      <GoogleFormsConfigModal
        isOpen={isFormsConfigOpen}
        onClose={() => setIsFormsConfigOpen(false)}
        config={formsConfig}
        onSaveConfig={setFormsConfig}
      />
    </div>
  );
}
