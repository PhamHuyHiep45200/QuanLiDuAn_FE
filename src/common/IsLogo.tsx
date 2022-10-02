import { Image, Space, Spin } from "antd";
import React from "react";
import Logo from "../assets/image/logoShash.png";
import styles from "../styles/logo.module.scss";

function IsLogo() {
  return (
    <div className={styles.logo}>
      <Space direction="vertical" align="center">
        <div className={styles.logo_box_image}>
          <Image src={Logo} preview={false} className={styles.logo_image} />
        </div>
        <Space>
          <Image
            src={Logo}
            preview={false}
            height={25}
            className={styles.animations_logo1}
          />
          <Image
            src={Logo}
            preview={false}
            height={25}
            className={styles.animations_logo2}
          />
          <Image
            src={Logo}
            preview={false}
            height={25}
            className={styles.animations_logo3}
          />
          <Image
            src={Logo}
            preview={false}
            height={25}
            className={styles.animations_logo4}
          />
        </Space>
      </Space>
    </div>
  );
}

export default IsLogo;
