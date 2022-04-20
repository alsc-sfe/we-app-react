import { useContext, useEffect, useState } from 'react';
import { WeAppContext } from '../context';

export function useLocation() {
  const context = useContext(WeAppContext);

  const [loc, setLoc] = useState({});

  useEffect(() => {
    setLoc({
      pathname: context.pathname,
      match: context.match.params,
      query: context.match.query,
      routerType: context.routerType,
    });
  }, [context]);

  return loc;
}

export function useParams() {
  const context = useContext(WeAppContext);

  const [params, setParams] = useState({});

  useEffect(() => {
    setParams(context.match.params);
  }, [context]);

  return params;
}

export function useQuery() {
  const context = useContext(WeAppContext);

  const [query, setQuery] = useState({});

  useEffect(() => {
    setQuery(context.match.query);
  }, [context]);

  return query;
}
