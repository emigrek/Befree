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
    freeFor: 'Wolny przez...',
    goal: 'Cel',
    relapse: 'Wpadka',
    remove: 'Porzuć',
    save: 'Zapisz',
    name: 'Nazwa',
    pickImage: 'Wybierz obraz',
    removeImage: 'Usuń obraz',
    empty: 'Pusto',
  },
  goals: {
    'ten-minutes': '10 minut',
    'thirty-minutes': '30 minut',
    'one-hour': '1 godzina',
    'half-day': 'Pół dnia',
    day: 'Dzień',
    'three-days': '3 dni',
    week: 'Tydzień',
    month: 'Miesiąc',
    quarter: 'Kwartał',
    'half-year': 'Pół roku',
    year: 'Rok',
  },
  banners: {
    offline: {
      title: 'Tryb bez internetu',
      description: 'Niektóre funkcje mogą być niedostępne',
      acknowledge: 'Rozumiem',
    },
  },
  validation: {
    name: {
      max: 'Maksymalnie %{max} znaków',
      min: 'Minimalnie %{min} znaki',
    },
  },
  screens: {
    home: {
      label: 'Główna',
      gretting: 'Cześć, %{name}! 👋',
    },
    notifications: {
      label: 'Powiadomienia',
      notificationsPermissions: 'Uprawnienia do powiadomień',
      achievementsNotifications: 'Powiadomienia o osiągnięciach',
      turnNotificationsOff: 'Wyłącz powiadomienia',
      turnNotificationsOn: 'Włącz powiadomienia',
      notificationsCount: '%{count} powiadomień',
    },
    addictions: {
      label: 'Uzależnienia',
      commitment: 'Postanawiam skończyć z:',
    },
    authentication: {
      title: 'Logowanie',
      subtitle: 'Zaloguj się aby dzielić dane między urządzeniami',
      errorMessage: 'Wystąpił błąd, spróbuj ponownie',
      cancelMessage: `Logowanie zostało przerwane`,
      dismissMessage: `Okno logowania zostało porzucone`,
      helperText: `Aby kontunuować, wymagane jest połączenie z internetem`,
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
        connectionError: 'Niedostępne bez internetu',
      },
      startDate: {
        title: 'Data rozpoczęcia',
        description: 'Kiedy rozpocząłeś swoją podróż?',
      },
      uploading: {
        title: 'Tworzenie...',
      },
    },
  },
  modals: {
    add: {
      label: 'Dodaj uzależnienie',
    },
    addiction: {
      progress: {
        label: 'Postęp',
        timeline: {
          distinctPast: 'Wyróżnij przeszłość',
          invert: 'Odwróć kolory',
        },
      },
      achievements: {
        label: 'Osiągnięcia',
        achieved: 'Osiągnięto %{achievedAt} temu',
        notAchieved: 'Za %{goalAt}',
      },
      notifications: {
        label: 'Powiadomienia',
      },
    },
    hiddenaddictions: {
      label: 'Ukryte uzależnienia',
      locked: {
        title: 'Odblokuj używając lokalnej autoryzacji',
      },
    },
    edit: {
      label: 'Edytuj',
      editing: 'Edytowanie...',
    },
    sorting: {
      label: 'Sortowanie',
      fieldTitle: 'Sortuj według',
      directionTitle: 'Kierunek',
      directions: {
        asc: 'Rosnąco',
        desc: 'Malejąco',
      },
      fields: {
        createdAt: 'Data utworzenia',
        lastRelapse: 'Ostatnia wpadka',
        name: 'Nazwa',
      },
    },
    achievement: {
      label: 'Osiągnięcie',
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
  widgets: {
    fastCreate: {
      title: 'Szybkie dodawanie',
      description: 'Tapnij aby dodać, przytrzymaj aby edytować',
      presetNames: [
        'Alkohol',
        'Nikotyna',
        'Kawa',
        'Jedzenie',
        'Zakupy',
        'Gry',
        'Internet',
        'Twitch.tv',
        'Youtube',
        'Facebook',
        'Telefon',
        'Praca',
        'Narkotyki',
        'Seks',
      ],
    },
  },
  notifications: {
    achievement: {
      title: 'Udało się!',
      body: 'Jesteś wolny od %{name} przez %{goalType}.',
    },
  },
};

export default pl;
