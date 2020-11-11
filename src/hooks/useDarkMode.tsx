import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Selectors
import { darkModeSelector } from 'selectors';

// Actions
import { toggleDarkModeRequest } from 'actions';

/**
 * Enables or disables the dark mode
 */
export default function useDarkMode(): [boolean, () => void] {
  const dispatch = useDispatch();
  const darkMode = useSelector(darkModeSelector);

  const toggleDarkMode = useCallback(
    () => dispatch(toggleDarkModeRequest()),
    []
  );

  // Effect that only gets updated when
  // dark mode switch is clicked
  useEffect(() => {
    let toggleAction = 'add';

    // If dark mode is enabled
    if (darkMode) {
      // Remove light theme's class name from the root element
      toggleAction = 'remove';
      // Save it to local storage
      localStorage.setItem('darkMode', '1');
    } else {
      // If the light mode is enabled,
      // remove the dark mode local storage
      localStorage.removeItem('darkMode');
    }

    // Add/remove the class from the root element
    document.documentElement.classList[toggleAction]('light-theme');
  }, [darkMode]);

  return [darkMode, toggleDarkMode];
}
