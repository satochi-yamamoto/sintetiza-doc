"""
Configuração centralizada para os testes do Testsprite.
Este arquivo contém variáveis de configuração compartilhadas entre todos os testes.
"""

# URL base para os testes
BASE_URL = "http://localhost:3012"

# Timeouts (em milissegundos)
DEFAULT_TIMEOUT = 5000
PAGE_LOAD_TIMEOUT = 10000
DOM_LOAD_TIMEOUT = 3000

# Configurações do navegador
BROWSER_ARGS = [
    "--window-size=1280,720",
    "--disable-dev-shm-usage",
    "--ipc=host",
    "--single-process"
]

# Modos de espera
WAIT_UNTIL = "commit"