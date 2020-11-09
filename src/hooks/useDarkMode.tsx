import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store';

// Actions
import { toggleDarkModeRequest } from 'actions';

export default function useDarkMode(): [boolean, () => void] {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode);

  const toggleDarkMode = useCallback(
    () => dispatch(toggleDarkModeRequest()),
    []
  );

  useEffect(() => {
    let toggleAction = 'add';

    if (darkMode) {
      toggleAction = 'remove';
      localStorage.setItem('darkMode', '1');
    } else {
      localStorage.removeItem('darkMode');
    }

    document.documentElement.classList[toggleAction]('light-theme');
  }, [darkMode]);

  return [darkMode, toggleDarkMode];
}
