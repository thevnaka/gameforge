if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/GAME FORGE/scripts/service-worker.js')
      .then((registration) => {
        console.log('Service Worker Registered:', registration);
      })
      .catch((error) => {
        console.log('Service Worker Registration Failed:', error);
      });
  }
  