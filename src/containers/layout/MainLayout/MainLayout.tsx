import { Layout } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@containers/layout/Sidebar';
import styles from './MainLayout.module.css';

const { Header, Content, Footer } = Layout;

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className={styles.layout}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((prev) => !prev)} />
      <Layout>
        <Header className={styles.header}>Forex Strategy Manager</Header>
        <Content className={styles.content}>
          <Outlet />
        </Content>
        <Footer className={styles.footer}>Forex Strategy Manager</Footer>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
