<p align="right"><small>TOC click here ↑</small></p>

<a id="readme-top"></a>

<h1 align="center">
  <br>
  <a href="https://github.com/formml/formml">
    <picture>
      <source srcset="docs/logo/logo-bg.svg" media="(prefers-color-scheme: dark)">
      <img src="docs/logo/logo-color.svg" alt="FormML Logo" width="300">
    </picture>
  </a>
  <br>
</h1>

<h4 align="center">The Ultimate Solution for Building <a href="#whats-the-enterprise-level-forms">Enterprise-Level</a> Forms<br><small>(or at least, we're aiming for it 😅)</small></h4>

<h5 align="center">- 🚧 In Active Development 🏗️ -</h5>

<p align="center">  
  <a href="https://www.npmjs.com/package/@formml/client">
    <img src="https://img.shields.io/npm/v/%40formml%2Fclient?logo=npm&label=%40formml%2Fclient" alt="client npm version">
  </a>
  <a href="https://github.com/formml/formml/blob/main/LICENSE.md">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT">
  </a>
  <a href="https://github.com/formml/formml/stargazers">
    <img src="https://img.shields.io/github/stars/formml/formml.svg" alt="GitHub stars">
  </a>
  <a href="https://x.com/jindong_z">
    <img alt="X (formerly Twitter) Follow" src="https://img.shields.io/twitter/follow/jindong_z">
  </a>
</p>

<p align="center">
  <a href="#motivation">Motivation</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#formml-dsl-reference">FormML DSL Reference</a> •
  <a href="#api-reference">API Reference</a> •
  <a href="#known-issues">Known Issues</a> •
  <a href="#roadmap">Roadmap</a>
</p>

<p align="center">
  <b>Key Features</b>
</p>

<p align="center">
  👨‍👩‍👧‍👦 Non-dev friendly DSL<br>
  🛡️ Next-level type safety<br>
  🚀 Faster than Starship<br>
  🔌 Framework agnostic<br>
  🔄 First-class dynamic forms support (WIP)<br>
  ⚡ First-class real-time forms support (WIP)
</p>

## Motivation

Forms can be **simple** (a sign-up or a survey) or **complex** (a loan application or a tax return). While there are many powerful tools in the ecosystem for building basic forms, such as [Formik](https://formik.org/) and [React Hook Form](https://react-hook-form.com/), there isn't yet a serious solution (to my knowledge) that specifically addresses the pain points of complex forms - the **Enterprise-Level** forms.

### What's the Enterprise-Level Forms?

Imagine you're a financial company building an online loan application form. What challenges might you face?

- **Non-Tech Stakeholders Driven**: Loans are serious business involving specialized knowledge across finance, accounting, and legal domains - knowledge typically held only by **non-technical experts**. A key challenge is enabling these stakeholders to lead form design while maintaining smooth collaboration with developers.
- **Branded UI & Custom UX**: Developers matter too! Companies don't want cookie-cutter form designs. Every serious enterprise wants to build their brand and deliver unique user experiences, goals that require developer expertise to achieve.
- **Calculations, Formulas & Dynamic Behavior**: Loan amounts, monthly payments and other fields need real-time calculation through formulas. Different fields also need to be shown or hidden based on the selected "loan type".
- **Auto-save & Resume**: Complex forms can have hundreds of fields - users don't want to start over if they accidentally close their browser.
- **Others**: Performance, validation, prefilling, and more.

These aren't niche problems specific to certain scenarios, but common challenges enterprises face when building complex forms. We call all the forms with similar pain points "**Enterprise-Level**" forms.

### How Does FormML Address These?

- **Non-Tech Stakeholders Driven** ➡️ **Non-Dev Friendly DSL**: As its full name "Form Modeling Language" suggests, FormML's core is a DSL for modeling forms. It was designed from the ground up for non-developers, with simple structure, minimal syntax, and more natural terminology (e.g., "text" instead of "string").
- **Branded UI & Custom UX** ➡️ **Model-View Separation**: FormML DSL focuses on modeling form business logic. Once the model (`.formml` file) is complete, UI/view implementation is entirely in developers' hands and fully customizable.
- **Calculations, Formulas & Dynamic Behavior** ➡️ **First-class dynamic forms support** & **Excel-like formula** (WIP)
- **Auto-save & Resume** ➡️ **First-class real-time forms support** (WIP)
- **Others**: Performance (reactivity system based on [@vue/reactivity](https://github.com/vuejs/core/tree/main/packages/reactivity)), validation (annotations based on [valibot](https://valibot.dev/)), prefilling (plugin system)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

## FormML DSL Reference

## API Reference

## Known Issues

## Roadmap
