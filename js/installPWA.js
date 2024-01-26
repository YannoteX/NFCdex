let deferredPrompt;



window.addEventListener('beforeinstallprompt', (e) => {
    deferredPrompt = e;
});



const installApp = document.querySelectorAll('.installApp');



installApp.forEach(element => {
    element.addEventListener('click', async () => {
        if (deferredPrompt !== null) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                deferredPrompt = null;
            }
        }
    });
})

