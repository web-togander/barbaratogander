function contentLoaded() {

const mainContainer = document.querySelector('.page_content');

console.log(mainContainer);

/* MENU DISPLAY FOR MOBILE */
// Please adjust and check
let w = document.documentElement.clientWidth || window.innerWidth;

// Only execute for 600px width and below
if( w <= 600 ) {

  // On home, open menu with main title
  if( mainContainer.classList.contains('home') ) 
  {
    const mainTitle = document.getElementById('main-title');
    const mainNav = document.getElementById('main-navigation');

    mainTitle.addEventListener('click', function() {
      if(mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
      }
      else
      {
        mainNav.classList.add('active');
      }
    })
  }

}

/* CHANGE LANGUAGE ON CLICK */ 
const langSelector = document.getElementById('lang-selector');
const translatableElements = document.querySelectorAll('.translatable-element');
let pageLanguage = mainContainer.lang;

// Check for page language and display corresponding menu items:
function translateElement() {

  translatableElements.forEach(item => {
    const itemLanguage = item.lang;
    // If item lang is not the same as page lang, hide item
    if(itemLanguage !== pageLanguage) {
      item.style.display = 'none';
    } 
    // If it's the same, display it
    else
    {
      item.style.display = 'block';
    }
  });
}
translateElement();

// Navigate to corresponding page depending on the language set on main-container
function changePageLanguage() {

  // If on homepage, just change items' lang (not page)
  if( mainContainer.classList.contains('home') ) 
  {
    switch( pageLanguage ) 
    {
      case 'en':
        pageLanguage = 'es';
        break;
      case 'es':
        pageLanguage = 'en';
        break;
      default:
        pageLanguage = 'es';
    }
    translateElement(pageLanguage);
  }
  // If not on homepage, change to corresponding lang site
  else 
  {
    // Check for current location
    let currentLocation = location.href;
    let newLocation;

    // Create an array with page sections 
    const pageSections = 
    [
      { esTitle: 'proyectos/',       enTitle: 'en/projects/' },
      { esTitle: 'colaboraciones/',  enTitle: 'en/collabs/' },
      { esTitle: 'entrevistas/',     enTitle: 'en/interviews/' },
      { esTitle: 'bio/',             enTitle: 'en/bio/' },
    ];

    // Create an array of subpages if they have different names (ENGLISH / SPANISH )
    const subpages = 
    [
      { 
        esTitle: 'proyecto-audiovisual/',
        enTitle: 'av-project/' 
      },
      { 
        esTitle: 'residencia-los-dos-ombues/',       enTitle: 'los-dos-ombues-residency/' 
      },
      { 
        esTitle: 'paraiso-en-blanco/',       enTitle: 'an-unsolved-blank-paradise/' 
      },
      { 
        esTitle: 'togander-cuarteto/',       enTitle: 'togander-cuartet/' 
      },
    ]

    // If current language is 'es', change to 'en' vesrion of the page
    if(pageLanguage == 'es') 
    {
      // First, change the Section
      pageSections.forEach(section => {
        if ( currentLocation.includes(section.esTitle) )
        {
          newLocation = currentLocation.replace(section.esTitle, section.enTitle);
        }
      })
      // Then, if on a subpage, change the subpage
      subpages.forEach(subpage => {
        if( newLocation.includes(subpage.esTitle) )
        {
          newLocation = newLocation.replace(subpage.esTitle, subpage.enTitle);
        }
      })
    }
    // If current language is 'en', change to 'es' vesrion of the page
    if(pageLanguage == 'en') 
    {
      // First, change the Section
      pageSections.forEach(section => {
        if ( currentLocation.includes(section.enTitle) )
        {
          newLocation = currentLocation.replace(section.enTitle, section.esTitle);
        }
      })
      // Then, if on a subpage, change the subpage
      subpages.forEach(subpage => {
        if( newLocation.includes(subpage.enTitle) )
        {
          newLocation = newLocation.replace(subpage.enTitle, subpage.esTitle);
        }
      })
    }
    // Finally, got to location
    location.href = newLocation;
  }
}
langSelector.addEventListener('click', changePageLanguage);

/* For Collabs section only */
if( mainContainer.id == 'collabs-section' )
{
  // Get all the li elements that have pictures
  let mediaLis = document.querySelectorAll('.has-media');
  mediaLis = Array.from(mediaLis);

  // Get the floating display for images
  const floatingDisplay = document.getElementById('floating-display');
  
  // Create a function to display div of class 'media-display-container inside floatingDisplay
  function displayImage(el) {

    let children = el.children;
    children = Array.from(children);

    children.forEach( child => {
      if( child.classList.contains('media-display-container') )
      {
        if(child.innerHTML != floatingDisplay.innerHTML) {

          childImg = child.children[0];
          childImg.classList.add('appear');
      
          displayContent = child.innerHTML;
          floatingDisplay.innerHTML = displayContent;

        }
        
      }
    })
  }
  mediaLis.forEach( el => {
    
    el.addEventListener('mouseenter', () => {
      // Call displayImage for the element that was hovered
      displayImage(el);
    });

  })
  
}

}