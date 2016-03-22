import test from 'ava';
import <%= camelModuleName %> from '../src';

test('<%= camelModuleName %>', t => {
  t.is(true, <%= camelModuleName %>(), 'return true');
});
