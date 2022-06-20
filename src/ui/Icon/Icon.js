import React from 'react';
import PropTypes from 'prop-types';
import SpriteSvg from '../../assets/images/hownow-icons-sprite.svg';

import Styles from './Icon.module.css';

const Icon = ({
  hide = false,
  className = '',
  icon = '',
  size = 20,
  onClick = () => {},
  ...rest
}) =>
  !hide ? (
    <svg
      className={`${Styles.icon} ${className}`}
      onClick={onClick}
      width={size}
      height={size}
      {...rest}
    >
      <use xlinkHref={`${SpriteSvg}#${icon}`} />
    </svg>
  ) : (
    ''
  );

Icon.propTypes = {
  icon: PropTypes.string,
  size: PropTypes.number,
  hide: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Icon;
