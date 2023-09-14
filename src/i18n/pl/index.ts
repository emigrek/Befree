import { Translation } from '../types';

const pl: Translation = {
  labels: {
    signIn: 'Zaloguj się',
    signOut: 'Wyloguj się',
    signOutConfirmationMessage: 'Na pewno chcesz się wylogować?',
    close: 'Zamknij',
    cancel: 'Nie',
    confirm: 'Tak',
    account: 'Konto',
    on: 'Włącz',
    off: 'Wyłącz',
  },
  screens: {
    home: {
      gretting: 'Cześć, %{name}! 👋',
    },
    notifications: {
      label: 'Powiadomienia',
    },
    addictions: {
      label: 'Uzależnienia',
    },
    authentication: {
      title: 'Logowanie',
      subtitle: 'Zaloguj się aby dzielić danę między urządzeniami',
      errorMessage: 'Wystąpił błąd, spróbuj ponownie',
      cancelMessage: `Logowanie zostało przerwane`,
      dismissMessage: `Okno logowania zostało porzucone`,
    },
  },
  bottomSheets: {
    theme: {
      modeTitle: 'Tryb ciemny',
      themeTitle: 'Ciemny motyw',
      lightsOut: 'Zgaszone światło',
      dim: 'Przyciemnienie',
      device: 'Użyj ustawień urządzenia',
    },
  },
};

export default pl;
