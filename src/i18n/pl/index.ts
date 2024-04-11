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
    date: 'Data',
    hour: 'Godzina',
    uploadingImage: 'Wysyłanie obrazu',
    note: 'Notatka',
    emptyNote: 'Brak notatki',
    startedAt: 'Data dodania',
    longestAbstinenceEnd: 'Koniec najdłuższej przerwy',
    hidden: 'Ukryte',
  },
  goals: {
    'ten-minutes': '10 minut',
    'thirty-minutes': '30 minut',
    'one-hour': '1 godzina',
    'three-hours': '3 godziny',
    'half-day': 'Pół dnia',
    day: 'Dzień',
    'three-days': '3 dni',
    week: 'Tydzień',
    month: 'Miesiąc',
    'three-months': '3 miesiące',
    quarter: 'Kwartał',
    'half-year': 'Pół roku',
    'nine-months': '9 miesięcy',
    year: 'Rok',
  },
  validation: {
    name: {
      max: 'Maksymalnie %{max} znaków',
      min: 'Minimalnie %{min} znaki',
    },
    note: {
      max: 'Maksymalnie %{max} znaków',
    },
  },
  screens: {
    home: {
      label: 'Główna',
    },
    notifications: {
      label: 'Powiadomienia',
      notificationsPermissions: 'Uprawnienia do powiadomień',
      achievementsNotifications: 'Powiadomienia o osiągnięciach',
      turnNotificationsOff: 'Wyłącz powiadomienia',
      turnNotificationsOn: 'Włącz powiadomienia',
      notificationsCount: '%{count} powiadomień',
      empty: 'Brak powiadomień',
    },
    addictions: {
      label: 'Uzależnienia',
      commitment: 'Postanawiam skończyć z:',
      empty: 'Brak uzależnień, zacznij lepsze życie od dodania nowego!',
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
  },
  modals: {
    relapsecreator: {
      label: 'Dodaj wpadkę',
    },
    addictioncreator: {
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
      relapses: {
        label: 'Wpadki',
        timeline: {
          title: 'Oś czasu',
        },
        list: {
          title: 'Ostatnie wpadki',
          timeSectionTitles: {
            today: 'Dzisiaj',
            yesterday: 'Wczoraj',
            last7Days: 'Ostatnie 7 Dni',
            last30Days: 'Ostatnie 30 Dni',
          },
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
      settings: {
        label: 'Ustawienia',
        list: {
          hidden: {
            name: 'Ukryj',
            description:
              'Ukryte uzależnienia są zabezpieczone autoryzacją lokalną',
          },
          inverseTimelineColor: {
            name: 'Odwróć kolory',
            description:
              'Odwróć kolory na osi czasu (przydatne jeżeli nawyk jest pozytywny)',
          },
          delete: {
            name: 'Usuń',
            description: 'Usuń uzależnienie (nieodwracalne)',
          },
        },
        sections: {
          privacy: 'Prywatność',
          display: 'Wyświetlanie',
          management: 'Zarządzanie',
        },
      },
    },
    hiddenaddictions: {
      label: 'Ukryte uzależnienia',
      locked: {
        title: 'Odblokuj używając lokalnej autoryzacji',
      },
    },
    addictionedit: {
      label: 'Edytuj uzależnienie',
      editing: 'Edytowanie...',
    },
    relapseedit: {
      label: 'Edytuj wpadke',
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
        relapses: 'Ostatnia wpadka',
        name: 'Nazwa',
      },
    },
    achievement: {
      label: 'Osiągnięcie',
    },
    relapse: {
      label: 'Wpadka %{addictionName}',
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
    dailyQuote: {
      title: 'Cytat dnia',
      description: 'Codzienna motywacja',
    },
    greeting: {
      morning: 'Dzień dobry, %{name}! 👋',
      afternoon: 'Dzień dobry, %{name}! 👋',
      evening: 'Dobry wieczór, %{name}! 👋',
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
