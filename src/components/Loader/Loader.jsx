import { ProgressBar } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loaderWrap}>
      <ProgressBar
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        barColor="#23626F"
        borderColor="#23626F"
        ariaLabel="progress-bar-loading"
      />
    </div>
  );
};

export default Loader;
