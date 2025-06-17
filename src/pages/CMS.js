import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CMS from '../components/CMS';

const CMSPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return <CMS />;
};

export default CMSPage;
