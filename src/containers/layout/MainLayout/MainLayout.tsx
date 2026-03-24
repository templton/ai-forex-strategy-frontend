import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';

const { Header, Content, Footer } = Layout;

function MainLayout() {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>Forex Strategy Manager</Header>
      <Content className={styles.content}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>Forex Strategy Manager</Footer>
    </Layout>
  );
}

export default MainLayout;
