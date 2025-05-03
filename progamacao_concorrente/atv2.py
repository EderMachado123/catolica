import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import threading

def buscar_palavra_no_site(url_inicial, palavra, profundidade_maxima=3):
    urls_visitados = set()
    resultados = {}
    lock = threading.Lock()  # Lock para evitar conflito entre threads

    def buscar_recursivo(url_atual, profundidade_atual):
        if profundidade_atual > profundidade_maxima:
            return
        
        with lock:
            if url_atual in urls_visitados:
                return
            urls_visitados.add(url_atual)

        try:
            print(f"Buscando em: {url_atual} (Profundidade: {profundidade_atual})")
            response = requests.get(url_atual, timeout=10)
            response.raise_for_status()  # Lança exceção para erros HTTP

            # Analisa o conteúdo HTML
            soup = BeautifulSoup(response.text, 'html.parser')
            conteudo = soup.get_text().lower()
            palavra_encontrada = palavra.lower() in conteudo

            with lock:
                resultados[url_atual] = palavra_encontrada

            # Extrai todos os links da página
            links = soup.find_all('a', href=True)
            threads = []

            for link in links:
                url_completa = urljoin(url_inicial, link['href'])
                
                # Garante que só navegamos dentro do mesmo domínio
                if url_completa.startswith(url_inicial):
                    thread = threading.Thread(target=buscar_recursivo, args=(url_completa, profundidade_atual + 1))
                    thread.start()
                    threads.append(thread)

            # Aguarda todas as threads finalizarem antes de continuar
            for thread in threads:
                thread.join()

        except requests.exceptions.RequestException as e:
            print(f"Erro ao acessar {url_atual}: {e}")

    # Inicia a busca com a primeira página
    buscar_recursivo(url_inicial, profundidade_atual=1)
    
    return resultados

# Exemplo de uso
if __name__ == "__main__":
    url_inicial = input("Digite a URL inicial do site (ex.: https://www.exemplo.com): ")
    palavra = input("Digite a palavra a ser buscada: ")
    
    resultados = buscar_palavra_no_site(url_inicial, palavra)

    print("\nResultados da busca:")
    for url, encontrada in resultados.items():
        status = "Encontrada" if encontrada else "Não encontrada"
        print(f"{url}: Palavra '{palavra}' {status}")