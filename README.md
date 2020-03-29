# Revolut exchange

[![Actions Status: actions-status](https://github.com/Meemaw/revolut-exchange/workflows/website/badge.svg)](https://github.com/Meemaw/revolut-exchange/actions)
[![coverage: codecov](https://codecov.io/gh/Meemaw/revolut-exchange/branch/master/graph/badge.svg)](https://codecov.io/gh/Meemaw/revolut-exchange)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Storybook: storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://meemaw.github.io/revolut-exchange)
[![Open source: open-source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

Revolut like exchange UI implementation using:

- [NextJS](https://github.com/zeit/next.js/) for server side rendering
- [Baseweb](https://baseweb.design/) as a UI framework
- [Styletron](https://github.com/styletron/styletron) for atomic CSS generation
- [swr](https://github.com/zeit/swr) & [ky](https://github.com/sindresorhus/ky) for remote data fetching
- [nivo](https://github.com/plouc/nivo) for dataviz
- [Jest](https://github.com/facebook/jest/) & [RTL](https://github.com/testing-library/react-testing-library) for unit testing
- [Testcafe](https://github.com/DevExpress/testcafe) for E2E testing
- [Storybook](https://github.com/storybookjs/storybook/) for visual development
- [https://openexchangerates.org](https://openexchangerates.org) for exchange rates

## Deployments:

- [website](https://revolut-exchange.now.sh)
- [storybooks](https://meemaw.github.io/revolut-exchange)

## Trying it out locally

### Setup source code

```sh
➜ git@github.com:Meemaw/revolut-exchange.git
➜ cd revolut-exchange
➜ yarn
```

### Start development server

```sh
➜ yarn dev
```

###### Mock API will be used when `process.env.NODE_ENV !== 'production'` to avoid free quota usage.
