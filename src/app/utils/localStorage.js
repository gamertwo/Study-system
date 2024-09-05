export const getSubjects = () => {
    if (typeof window !== 'undefined') {
      const subjects = localStorage.getItem('subjects');
      return subjects ? JSON.parse(subjects) : [];
    }
    return [];
  };
  
  export const saveSubjects = (subjects) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('subjects', JSON.stringify(subjects));
    }
  };
  