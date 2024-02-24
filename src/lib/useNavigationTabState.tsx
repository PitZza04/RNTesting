import {useNavigationState} from '@react-navigation/native';
import {TabState, getTabState} from './routes/helpers';

export function useNavigationTabState() {
  return useNavigationState(state => {
    const res = {
      isAtHome: getTabState(state, 'Home') !== TabState.Outside,
    };
    if (!res.isAtHome) {
      // HACK for some reason useNavigationState will give us pre-hydration results
      //      and not update after, so we force isAtHome if all came back false
      //      -prf
      res.isAtHome = true;
    }
    return res;
  });
}
