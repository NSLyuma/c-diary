import React from 'react';
import Header from '../../features/Header/Header';
import PageWrapper from '../../wrappers/PageWrapper';
import styles from './Main.module.css';
import '../../styles/index.css';
import Auth from '../Auth/Auth';

function Main() {
  return (
    <PageWrapper>
      <Header />
      <p className={`${styles.name} container`}>Дневник калорий</p>
      <Auth />
    </PageWrapper>
  );
}

export default Main;
