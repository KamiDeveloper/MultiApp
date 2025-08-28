import Styles from './Layout.module.css';

import { githubIcon, linkedinIcon, twitterIcon } from '../../icons/Icons';

const Layout = ({ children }) => {
    return (
        
        <div className={Styles.layout}>
            <header className={Styles.headerContent}>
                <div className={Styles.headerTitle}>
                    KAMI
                </div>
                <div className={Styles.headerSocial}>
                    <a href="https://github.com/KamiDeveloper" target="_blank" rel="noopener noreferrer" className={Styles.headerSocialLink}>
                        {githubIcon()}
                    </a>
                    <a href="https://www.linkedin.com/in/jorge-medrano-ramirez/" target="_blank" rel="noopener noreferrer" className={Styles.headerSocialLink + " " + Styles.linkedin}>
                        {linkedinIcon()}
                    </a>
                    <a href="https://x.com/KamiDev_" target="_blank" rel="noopener noreferrer" className={Styles.headerSocialLink}>
                        {twitterIcon()}
                    </a>
                </div>
            </header>
            <div className={Styles.mainAppTitle}>
                <h1 className={Styles.title}>Multi App</h1>
                <p className={Styles.subtitle}>Colección de mini aplicaciones</p>
            </div>
            {children}
        </div>
    );
};

export default Layout;
