import React from 'react';
import Header from './components/Header.js';
import Hero from './components/Hero.js';
import Browse from './components/Browse.js';
import Arrived from './components/Arrived.js';
import Clients from './components/Clients.js';
import AsideMenu from './components/AsideMenu.js';
import Footer from './components/Footer.js';
import Offline from './components/Offline.js';



function App() {
  const [items, setItems] = React.useState([]);
  const [OfflineStatus, setOfflineStatus] = React.useState(!navigator.onLine);

  function handleOfflineStatus(){
    setOfflineStatus(!navigator.onLine)
  }
  
  React.useEffect(function() {
    (async function() {
      console.log("render here")
      try{
        const response = await fetch('https://bwacharity.fly.dev/items', {
            headers:{
              "Content-Type" : "application/json",
              "accept" : "application/json",
            }
          });
          const { nodes } = await response.json();
          setItems(nodes);
    
          if (!document.querySelector('script[src="/carousel.js"]')) {
    
          const script = document.createElement("script");
          script.src = "/carousel.js";
          script.async = false;
          document.body.appendChild(script);
        }
      } catch(e){
        console.log("something error")
      }

    })();

    handleOfflineStatus();
    window.addEventListener('offline', handleOfflineStatus);
    window.addEventListener('online', handleOfflineStatus);

    return function(){
      window.removeEventListener('offline', handleOfflineStatus);
      window.removeEventListener('online', handleOfflineStatus);
    }

  }, [OfflineStatus]);
  return (
    <>

      {OfflineStatus && <Offline />}
      <Header />,
      <Hero />,
      <Browse />,
      <Arrived items={items} />,
      <Clients />,
      <AsideMenu />
      <Footer />
    </>
    
  );
}

export default App;
