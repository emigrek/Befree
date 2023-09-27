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
    next: 'Dalej',
    add: 'Dodaj',
    back: 'Wstecz',
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
    onboarding: {
      getStarted: 'Zacznij',
      skip: 'Pomiń',
      titles: [
        'Witaj',
        'Sledź postępy',
        'Ustal Cele',
        'Codzienna Motywacja',
        'Gotowy Rozpocząć',
      ],
      descriptions: [
        `Witaj w Befree, twoim towarzyszem w podróży ku wolności od uzależnień.`,
        'Korzystaj z naszych narzędzi śledzenia, aby monitorować swój postęp i świętować każdy kamień milowy po drodze.',
        'Określ swoje osobiste cele i aspiracje. Wyjście z uzależnienia to krok w kierunku ich osiągnięcia.',
        'Otrzymuj codzienne motywacyjne cytaty i wiadomości, aby zachować inspirację na swojej ścieżce do zdrowia.',
        'Jesteś gotowy, aby rozpocząć swoją podróż ku zdrowszemu, wolnemu od uzależnień życiu. Zaczynajmy ten pierwszy krok razem!',
      ],
    },
    creationWizard: {
      nameAndImage: {
        title: 'Nazwa i obraz',
        description: 'Z jakim uzależnieniem chcesz skonczyć?',
        placeholder: 'np. Alkohol',
      },
      startDate: {
        title: 'Data rozpoczęcia',
        description: 'Kiedy rozpocząłeś swoją podróż?',
      },
    },
  },
  modals: {
    add: {
      label: 'Dodaj uzależnienie',
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
