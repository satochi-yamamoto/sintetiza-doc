"""
Funções auxiliares compartilhadas para os testes do Testsprite.
Este arquivo contém funções comuns que podem ser reutilizadas em vários testes.
"""
import asyncio
from playwright import async_api
from config import BASE_URL, BROWSER_ARGS, DEFAULT_TIMEOUT, PAGE_LOAD_TIMEOUT, WAIT_UNTIL, DOM_LOAD_TIMEOUT

async def setup_browser():
    """
    Configura e inicia o navegador para os testes.
    
    Returns:
        tuple: (playwright, browser, context) - Instâncias necessárias para os testes
    """
    # Start a Playwright session in asynchronous mode
    pw = await async_api.async_playwright().start()
    
    # Launch a Chromium browser in headless mode with custom arguments
    browser = await pw.chromium.launch(
        headless=True,
        args=BROWSER_ARGS,
    )
    
    # Create a new browser context (like an incognito window)
    context = await browser.new_context()
    context.set_default_timeout(DEFAULT_TIMEOUT)
    
    return pw, browser, context

async def navigate_to_page(context, path=""):
    """
    Navega para uma página específica da aplicação.
    
    Args:
        context: Contexto do navegador
        path: Caminho relativo à URL base
        
    Returns:
        page: Instância da página
    """
    # Open a new page in the browser context
    page = await context.new_page()
    
    # Navigate to the target URL and wait until the network request is committed
    full_url = f"{BASE_URL}/{path}".rstrip('/')
    await page.goto(full_url, wait_until=WAIT_UNTIL, timeout=PAGE_LOAD_TIMEOUT)
    
    # Wait for the main page to reach DOMContentLoaded state
    try:
        await page.wait_for_load_state("domcontentloaded", timeout=DOM_LOAD_TIMEOUT)
    except async_api.Error:
        pass
    
    # Iterate through all iframes and wait for them to load as well
    for frame in page.frames:
        try:
            await frame.wait_for_load_state("domcontentloaded", timeout=DOM_LOAD_TIMEOUT)
        except async_api.Error:
            pass
            
    return page

async def login(page, email, password):
    """
    Realiza o login na aplicação.
    
    Args:
        page: Instância da página
        email: Email do usuário
        password: Senha do usuário
        
    Returns:
        bool: True se o login foi bem-sucedido, False caso contrário
    """
    try:
        # Clique no botão de login
        login_button = page.locator('xpath=html/body/div/div/header/div/div[2]/div[2]/button[1]').nth(0)
        await login_button.click()
        
        # Preenche o formulário de login
        await page.fill('input[type="email"]', email)
        await page.fill('input[type="password"]', password)
        
        # Clique no botão de enviar
        submit_button = page.locator('button[type="submit"]')
        await submit_button.click()
        
        # Verifica se o login foi bem-sucedido (aguarda redirecionamento para o dashboard)
        await page.wait_for_url(f"{BASE_URL}/dashboard", timeout=PAGE_LOAD_TIMEOUT)
        
        return True
    except Exception as e:
        print(f"Erro durante o login: {str(e)}")
        return False

async def register(page, email, password, name):
    """
    Realiza o registro de um novo usuário.
    
    Args:
        page: Instância da página
        email: Email do usuário
        password: Senha do usuário
        name: Nome do usuário
        
    Returns:
        bool: True se o registro foi bem-sucedido, False caso contrário
    """
    try:
        # Clique no botão de cadastro
        register_button = page.locator('xpath=html/body/div/div/header/div/div[2]/div[2]/button[2]').nth(0)
        await register_button.click()
        
        # Preenche o formulário de registro
        await page.fill('input[name="firstName"]', name)
        await page.fill('input[type="email"]', email)
        await page.fill('input[type="password"]', password)
        
        # Aceita os termos de uso
        terms_checkbox = page.locator('input[type="checkbox"]')
        await terms_checkbox.check()
        
        # Clique no botão de enviar
        submit_button = page.locator('button[type="submit"]')
        await submit_button.click()
        
        # Verifica se o registro foi bem-sucedido (aguarda redirecionamento para o dashboard)
        await page.wait_for_url(f"{BASE_URL}/dashboard", timeout=PAGE_LOAD_TIMEOUT)
        
        return True
    except Exception as e:
        print(f"Erro durante o registro: {str(e)}")
        return False

async def cleanup(pw, browser, context):
    """
    Limpa os recursos do navegador após os testes.
    
    Args:
        pw: Instância do Playwright
        browser: Instância do navegador
        context: Contexto do navegador
    """
    if context:
        await context.close()
    if browser:
        await browser.close()
    if pw:
        await pw.stop()