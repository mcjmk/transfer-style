# Projektowe - transfer-style

Reviewed: yes?

# Temat projektu

Aplikacja sieciowa implementująca tzw. “transfer stylu” między dwoma obrazkami. 

## Transfer Stylu

Wcześniej wspomniany transfer stylu polega na generacji obrazu na podstawie dwóch obrazów, przesłanych przez użytkownika. Wygenerowany obraz w założeniu będzie łączył charakterystyczne cechy jednego z nich (np. charakterystyczne kształty) ze stylem drugiego.

### Algorytm uczenia maszynowego

Planujemy wykorzystać algorytm uczenia głębokiego, opartego o architekturę encoder-decoder i mechanizm uwagi (attention mechanism). Algorytm wzorowany jest na architekturze AdaAttN ([https://arxiv.org/abs/2108.03647](https://arxiv.org/abs/2108.03647))

### Trenowanie modelu

W celu trenowania modelu wykorzystamy dwa zbiory danych, dostępne w internecie

- COCO (Common objects in context) - zbiór zdjęć ponad 100k zdjęć, które wykorzystamy do nauczenia modelu rozpoznawania złożonych struktur (czyli będą przesyłane w modelu jako obraz, z którego chcemy pozyskać charkaterystyczne cechu).
- WikiArt - zbiór ponad 80k obrazów, których

## Aplikacja sieciowa

Zamierzamy stworzyć prostą aplikację webową, w której użytkownik poprzez interfejs graficzny będzie mógł zażądać wygenerowanie obrazu na podstawie dwóch obrazów. 

### Frontend

Zamierzamy stworzyć interfejs użytkownika, wykorzystując framework [React lub Angular co wolicie].

Ma on pozwolić na wybranie dwóch obrazów z dysku użytkownika, pogląd wybranych zdjęć oraz na wyświetlenie wygenerowanego obrazu.

### Backend

Przewidujemy także stworzenie prostego serwisu, który w założeniu przyjmuje obrazy przesłane przez użytkownika przy użyciu aplikacji frontendowej, i “odesłaniu” wygenrowanego obrazu. 

Serwis ten jest potrzebny aby uniknąć kosztownych operacji po stronie klienta oraz ułatwieniu implementacji aplikacji.
