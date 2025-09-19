import asyncio
from playwright import async_api

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3000", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # Locate language selector and switch from Portuguese to English
        await page.mouse.wheel(0, window.innerHeight)
        

        # Scroll up to top and look for language selector or try to find it in header or footer
        await page.mouse.wheel(0, -window.innerHeight)
        

        # Check if any button or clickable element might open language selection or settings
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/nav/div/div/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Close sign-in modal and check 'Cadastrar' button for language selector or switch
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div[3]/div/div/div/div/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Scroll down to check footer or other page areas for language selector
        await page.mouse.wheel(0, window.innerHeight)
        

        # Check if any of the visible buttons or links might open a language selection menu or settings, especially 'Entrar', 'Cadastrar', or footer links
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/nav/div/div/div[2]/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Close registration modal and check footer or other page areas for language selector
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div[3]/div/div/div/div/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Try to switch language by modifying URL parameter to '?lang=en' and verify if UI text updates to English
        await page.goto('http://localhost:3000/?lang=en', timeout=10000)
        

        # Try to find any hidden or icon-based language selector or settings menu that might allow switching language
        await page.mouse.wheel(0, window.innerHeight)
        

        # Assert UI text updates to English after switching language to English
        assert 'PromptCraft AI - Manage your AI prompts' in await page.text_content('title') or 'PromptCraft AI - Manage your AI prompts' in await page.title()
        assert 'Complete platform to create, test and optimize AI prompts with support for multiple providers, automated tests and performance analysis.' in await page.text_content('body')
        assert 'Support for OpenAI, Claude and DeepSeek with automatic fallback' in await page.text_content('body')
        assert 'Monitor tokens, costs and response time for each prompt' in await page.text_content('body')
        assert 'Prompts protected with authentication and access control' in await page.text_content('body')
        assert 'Run and compare prompts in real time with different models' in await page.text_content('body')
        assert 'Organize prompts by categories, tags and workspaces' in await page.text_content('body')
        assert 'Plans from free to enterprise for different needs' in await page.text_content('body')
        assert 'Join hundreds of developers already using PromptCraft AI. Start for free.' in await page.text_content('body')
        # Switch back to Portuguese by navigating to the Portuguese language URL or clicking language selector
        await page.goto('http://localhost:3000/?lang=pt', timeout=10000)
        # Assert UI text reverts to Portuguese after switching back
        assert 'PromptCraft AI - Gerencie seus prompts de IA' in await page.text_content('title') or 'PromptCraft AI - Gerencie seus prompts de IA' in await page.title()
        assert 'Plataforma completa para criar, testar e otimizar prompts de IA com suporte a múltiplos provedores, testes automatizados e análise de performance.' in await page.text_content('body')
        assert 'Suporte para OpenAI, Claude e DeepSeek com fallback automático' in await page.text_content('body')
        assert 'Monitore tokens, custos e tempo de resposta de cada prompt' in await page.text_content('body')
        assert 'Prompts protegidos com autenticação e controle de acesso' in await page.text_content('body')
        assert 'Execute e compare prompts em tempo real com diferentes modelos' in await page.text_content('body')
        assert 'Organize prompts por categorias, tags e workspaces' in await page.text_content('body')
        assert 'Planos do gratuito ao enterprise para diferentes necessidades' in await page.text_content('body')
        assert 'Junte-se a centenas de desenvolvedores que já estão usando o PromptCraft AI. Comece gratuitamente.' in await page.text_content('body')
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    