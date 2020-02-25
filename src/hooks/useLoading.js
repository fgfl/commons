import { useState } from 'react';

/**
 * Use to show and toggle a loading spinner icon
 * @param {boolean} initialState Loading state
 */
export default function useLoading(initialState) {
  const [loading, setLoading] = useState(initialState);

  const updateLoadingState = (newState) => {
    setLoading(newState);
  };

  return { loading, updateLoadingState };
}
