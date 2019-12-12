import Loadable from 'react-loadable';
import LoadingComponent from 'components/loadingComponent';

export default (loader, loading = LoadingComponent ) => {
  return Loadable({
    loader,
    loading
  })
}