import { BallTriangle } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loader}>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4E75FF"
        ariaLabel="ball-triangle-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
