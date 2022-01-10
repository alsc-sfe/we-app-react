import { useContext, useCallback, useEffect, useState } from 'react';
import { WeAppContext } from '../context';

export function useLocation() {
  const context = useContext(WeAppContext);

  const [loc, setLoc] = useState({});

  useEffect(() => {
    setLoc({
      pathname: context.basename,
      match: context.match.params,
      query: context.match.query,
      routerType: context.routerType,
    });
  }, [location.href, context]);

  return loc;
}

export function useParams() {
  const context = useContext(WeAppContext);

  const [params, setParams] = useState({});

  useEffect(() => {
    setParams(context.match.params);
  }, [location.href, context]);

  return params;
}

export function useQuery() {
  const context = useContext(WeAppContext);

  const [query, setQuery] = useState({});

  useEffect(() => {
    setQuery(context.match.query);
  }, [location.href, context]);

  return query;
}
