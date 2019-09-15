import { createStyles, makeStyles } from '@material-ui/styles';

import React from 'react';
import clsx from 'clsx';
import logo from '../logo.svg';

const useStyles = makeStyles(() =>
  createStyles({
    image: {
      maxWidth: 50,
      maxHeight: 50,
    },
  })
);

interface LogoProps {
  className?: string;
  ref?: React.RefObject<HTMLImageElement>;
}

const Logo: React.FC<LogoProps> = React.forwardRef<HTMLImageElement, LogoProps>(
  (props, ref): React.ReactElement => {
    const { className } = props;

    const classes = useStyles();

    return <img src={logo} className={clsx(classes.image, className)} alt="logo" ref={ref} />;
  }
);

export default Logo;
