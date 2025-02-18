# Transfer Style

Aplikacja sieciowa implementująca tzw. “transfer stylu” między dwoma obrazkami. 

Polega on na generacji obrazu na podstawie dwóch obrazów, przesłanych przez użytkownika. Wygenerowany obraz w założeniu będzie łączył charakterystyczne cechy jednego z nich (np. charakterystyczne kształty) ze stylem drugiego.

### Algorytm uczenia maszynowego

Wykorzystujemy algorytm uczenia głębokiego, opartego o architekturę encoder(VGG) i decoder.
Algorytm wzorowany jest na architekturze AdaIN z artykułu "Arbitrary Style Transfer in Real-time with Adaptive Instance Normalization"[Huang+, ICCV2017].

### Trenowanie modelu

W celu trenowania modelu wykorzystaliśmy datasety :
- WikiArt - zbiór ok. 42 000 obrazów w różnych stylach, ponad 190 artystów 
- dataset MSCOCO (MicroSoft Common objects in context) - zbiór zdjęć ponad 100k zdjęć, które wykorzystamy do nauczenia modelu rozpoznawania złożonych struktur (czyli będą przesyłane w modelu jako obraz, z którego chcemy pozyskać charkaterystyczne cechu).

## Aplikacja sieciowa

Projekt ma formę aplikacji webowej, w której użytkownik poprzez interfejs graficzny będzie mógł zażądać wygenerowanie obrazu na podstawie dwóch obrazów wybranych z plików w komputerze. Pierwszy to obraz konwertowany a drugi to obraz reprezentujący styl jaki chcemy wykorzystać do transferu.

### Frontend
React Framework (Javascript).

### Backend
FastApi (Python).

### Model
Sieć Neuronowa zbudowana przy pomocy PyTorch.

