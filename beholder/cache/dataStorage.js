import * as FileSystem from 'expo-file-system';

const CACHE_PATH = `${FileSystem.documentDirectory}beholder/cache/trackedData.json`;
const logArray = []

const ensureFileExists = async () => {
  const dir = CACHE_PATH.replace(/\/[^\/]+$/, '');
  const dirInfo = await FileSystem.getInfoAsync(dir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }

  const fileInfo = await FileSystem.getInfoAsync(CACHE_PATH);
  if (!fileInfo.exists) {
    await FileSystem.writeAsStringAsync(CACHE_PATH, JSON.stringify([]));
  }
};

// export const logEvent = async (event) => {
//   try {
//     const fullEvent = {
//       ...event,
//       timestamp: Date.now(),
//     };

//     console.log('[Beholder] Logging event:', fullEvent);

//     await ensureFileExists();

//     const fileContent = await FileSystem.readAsStringAsync(CACHE_PATH);
//     let events = [];

//     try {
//       events = JSON.parse(fileContent);
//       if (!Array.isArray(events)) events = [];
//     } catch {
//       events = [];
//     }

//     events.push(fullEvent);

//     await FileSystem.writeAsStringAsync(
//       CACHE_PATH,
//       JSON.stringify(events, null, 2)
//     );
//   } catch (error) {
//     console.error('[Beholder] Failed to log event:', error);
//   }
// };
export const logEvent =  (event) => {
  try {
    console.log("we are in try")
    const fullEvent = {
      ...event,
      timestamp: Date.now(),
    };

    console.log('[Beholder] Logging event:', fullEvent);
    logArray.push(fullEvent)
    console.log("********************************************")
    console.log("Log array:", logArray);
    console.log("********************************************")

    } catch {
      console.log("we are in catch")
      events = [];
    }


  }

  export const printStoredEvents = async () => {

     try {
    const fileUri = FileSystem.documentDirectory + 'logs.json';
    const json = JSON.stringify(logArray, null, 2);
    await FileSystem.writeAsStringAsync(fileUri, json);
    console.log('✅ JSON file saved at:', fileUri);
  } catch (error) {
    console.error('❌ Failed to save JSON file:', error);
  }
  }

// export const printStoredEvents = async () => {
//   try {
//     const fileInfo = await FileSystem.getInfoAsync(CACHE_PATH);
//     if (!fileInfo.exists) {
//       console.log('[Beholder] No log file found.');
//       return;
//     }

//     const raw = await FileSystem.readAsStringAsync(CACHE_PATH);
//     const events = JSON.parse(raw || '[]');

//     console.log('[Beholder] Raw events:', events); 
//     const buttonCounts = {};
//     const screenTimes = {};

//     for (const event of events) {
//       if (event.type === 'button_press') {
//         const label = event.eventName || event.label || 'UnnamedButton';
//         buttonCounts[label] = (buttonCounts[label] || 0) + 1;
//       } else if (event.type === 'screen_time') {
//         const screen = event.screen || 'UnnamedScreen';
//         const duration = parseFloat(event.duration || 0);
//         screenTimes[screen] = (screenTimes[screen] || 0) + duration;
//       }
//     }

//     console.log('\nButton Presses:');
//     if (Object.keys(buttonCounts).length === 0) {
//       console.log(' • No button presses logged.');
//     } else {
//       for (const [label, count] of Object.entries(buttonCounts)) {
//         console.log(` • ${label}: ${count} ${count === 1 ? 'press' : 'presses'}`);
//       }
//     }

//     console.log('\nScreen Times:');
//     if (Object.keys(screenTimes).length === 0) {
//       console.log(' • No screen time logged.');
//     } else {
//       for (const [screen, duration] of Object.entries(screenTimes)) {
//         console.log(` • ${screen}: ${duration.toFixed(2)} seconds`);
//       }
//     }

//     console.log('\nTracker summary printed.');
//   } catch (error) {
//     console.error('[Beholder] Failed to read or summarize logs:', error);
//   }
// };

export const clearEventLog = async () => {
  try {
    await FileSystem.writeAsStringAsync(CACHE_PATH, JSON.stringify([]));
    console.log('[Beholder] Event log cleared.');
  } catch (error) {
    console.error('[Beholder] Failed to clear event log:', error);
  }
};
