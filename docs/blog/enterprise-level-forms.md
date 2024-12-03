# Beyond Basic Forms: Why **Enterprise-Level** Forms Remain a Challenge (and How FormML Solves It)

Forms are everywhere in the digital world, from simple newsletter signups to complex enterprise applications. While basic forms can be easily handled with popular tools like [Formik](https://formik.org/) or [React Hook Form](https://react-hook-form.com/), **enterprise-level** forms continue to present **significant challenges** that existing solutions struggle to address.

## What Are **Enterprise-Level** Forms?

**Enterprise-level** forms go beyond simple input fields and submit buttons. They are the backbone of complex workflows in industries like _finance_, _banking_, and _insurance_. These forms must balance _advanced functionality_, _scalability_, and _user experience_, making them fundamentally different from simpler counterparts.

### Examples of **Enterprise-Level** Forms

- **Loan Applications**: Complex forms that dynamically calculate _interest rates_, _monthly payments_, and _debt-to-income ratios_ in real-time. They must enforce regulatory compliance rules like _maximum loan amounts_ based on _credit scores_ and _income verification requirements_.

- **Tax Filings**: Multi-page forms that handle intricate tax calculations across different _income sources_, _deductions_, and _credits_. They need to validate against tax authority rules, support saving drafts across multiple sessions, and guide users through complex workflows like _itemized deductions_ vs _standard deductions_.

- **Insurance Claims**: Sophisticated forms that adapt based on _claim type_ (auto, home, life) and _policy details_. They pre-populate fields using existing customer data, handle file attachments for evidence, implement complex validation rules (e.g., _claim amount_ cannot exceed policy limits), and maintain consistent branding across various insurance products to differentiate them from competitors.

These examples are common in everyday life, but the effort hidden behind these forms is often overlooked. Their development requires collaboration between various talents, complex architectures, top-tier engineering teams, and up to several years of development time. In some small and medium-sized enterprises, it's even possible that the entire company's product is built upon such a single form.

Such mission-critical yet costly forms are what I refer to as "enterprise-level forms".

### Challenges on Building **Enterprise-Level** Forms

Imagine you're a financial company building an online loan application form. What challenges might you face?

- **Non-Technical Stakeholder Involvement**: Loans are complex, involving specialized knowledge in finance, accounting, and legal domains—expertise typically held by non-technical stakeholders. These stakeholders understand intricate business rules, such as _"If the applicant's credit score is below 650, require a co-signer"_ or _"Calculate the debt-to-income ratio using gross monthly income divided by total monthly debt payments"_. A significant challenge is enabling these stakeholders to lead form design efficiently, without spending excessive time teaching developers all the rules, while ensuring smooth collaboration for handling edge cases.

- **Branded UI & Custom UX**: Developers matter too! Companies don't want cookie-cutter form designs. Every serious enterprise wants to build their brand and deliver unique user experiences, goals that require developer expertise to achieve. For example, a bank might want their loan application to match their brand colors, use custom input components, or implement a step-by-step wizard interface that guides users through sections like _"Personal Information"_, _"Employment Details"_, and _"Loan Terms"_.

- **Calculations, Formulas & Dynamic Behavior**: A loan application form may need various complex real-time calculations and dynamic behaviors.

  - **Financial Calculations**: _Loan amounts_, _interest rates_, _monthly payments_, etc.
  - **Conditional Logic**: Show/hide fields based on loan type (e.g., different fields for _mortgages_ vs. _personal_ loans)
  - **Cross-field Dependencies**: Updating _income_ might affect _maximum loan amount_, _debt-to-income ratio_, and _interest rate_
  - **Real-time Validation**: Ensuring _loan amounts_ stay within policy limits based on _income_ and _credit score_

- **Auto-save & Resume**: Complex forms can have hundreds of fields - users don't want to start over if they accidentally close their browser.

- **Other Technical Challenges**:
  - **Performance**: Efficiently handling hundreds of fields with smooth UI responsiveness, ensuring fast calculations and seamless rendering
  - **Validation**: Comprehensive validation strategy including real-time client-side validation for immediate user feedback and robust server-side validation for data integrity and security
  - **Data Prefilling**: Populating fields from multiple data sources

These aren't niche problems specific to certain scenarios, but common challenges enterprises face when building complex forms. The combination of business complexity, technical requirements, and user experience needs makes enterprise-level forms particularly challenging to implement effectively.

## Where Existing Tools Fall Short

While popular form libraries like [Formik](https://formik.org/) and [React Hook Form](https://react-hook-form.com/) are excellent for handling basic forms, they are not built with enterprise needs in mind. When examining these tools in the context of our previously discussed challenges, several limitations become apparent:

### Challenge 1: Non-Technical Stakeholder Involvement

Current form libraries are **developer-centric**, requiring JavaScript/TypeScript knowledge to define form logic.

This empowers customization but significantly **reduces** the **efficiency** of delivering forms that contain complex rules. For example:

- **When form rules involve complex calculations**, stakeholders are forced to explain step-by-step to developers using verbal descriptions like _"calculate the maximum loan amount as 4 times the annual income, adjusted down by 15% if credit score is below 700, and further reduced by the percentage of existing monthly debt payments to gross monthly income, with an additional 10% reduction if the employment history is less than 2 years"_, even though these calculations may be common knowledge in their professional domain.

- **When form rules need modification**, such as adjusting loan limits, stakeholders still have to rely on developers to implement changes, resulting in longer processes and extended delivery times.

### Challenge 2: Branded UI & Custom UX

Both existing libraries excel in this aspect (due to their **developer-centric** nature), providing powerful customization capabilities. For example, [React Hook Form](https://react-hook-form.com/) offers a `Controller` component for adapting controlled input components.

### Challenge 3: Calculations, Formulas & Dynamic Behavior

Existing libraries provide "just-works" calculation capabilities, but lack the abstraction and organization capabilities for complex calculations.

Consider implementing a loan calculator in [React Hook Form](https://react-hook-form.com/):

```js
function LoanForm() {
  const { watch, setValue } = useForm()

  const [loanAmount, interestRate, term] = watch([
    'loanAmount',
    'interestRate',
    'term',
  ])

  useEffect(() => {
    if (loanAmount && interestRate && term) {
      const monthlyRate = interestRate / 100 / 12
      const months = term * 12
      const payment =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
      setValue('monthlyPayment', payment.toFixed(2))
    }
  }, [loanAmount, interestRate, term, setValue])

  return (
    <form>
      {/* ... */}
      <input type="number" {...register('monthlyPayment')} />
      {/* ... */}
    </form>
  )
}
```

This approach has several drawbacks:

- **Writing in JavaScript**: It refuses collaboration between non-technical stakeholders and developers.
- **Manual maintenance of field dependencies**: `watch(['loanAmount', 'interestRate', 'term'])`
- **Separation of field definition and value assignment**: In this example, `monthlyPayment` is registered in the return statement but assigned in `useEffect`
- **Extra boilerplate code**: `watch`, `setValue`, `useEffect`
- **Manual performance optimization**

### Challenge 4: Auto-save & Resume

There are no built-in solutions for auto-save & resume in these libraries. Implementing auto-save functionality requires significant custom code. Developers must handle:

- **Efficient state persistence**
- **Conflict resolution**
- **Data synchronization**
- **Progress tracking**
- **Error recovery**

---

These limitations create significant development overhead, longer time-to-market, and higher maintenance costs for enterprise applications. While workarounds exist, they often result in complex, brittle solutions that are difficult to maintain and scale.

FormML addresses these challenges through its domain-specific language and architecture designed specifically for enterprise-level forms, as we'll explore in the next section.

## The FormML Solution

**FormML**, short for **Form Modeling Language**, pronounced as "formal", is a new open-source framework designed specifically to tackle the challenges of enterprise-level forms. Here’s how it bridges the gaps left by other tools:

### Empowering Non-Tech Stakeholders

As its full name "Form Modeling Language" suggests, FormML introduces a **Domain-Specific Language** (DSL) that’s intuitive and non-developer friendly. Its simple structure, minimal syntax, and natural terminology enables financial experts, legal professionals, and other non-technical stakeholders to model forms without needing programming skills.

To build up a simplest runnable tax filling form, a skilled accountant without any programming knowledge can do it in just 5 minutes:

```java
form Tax {
  @required
  text     name

  @required @integer
  currency income

  @required @integer
  currency deductions

  currency taxableIncome = income - deductions
  num      taxRate = 0.15
  currency tax = taxableIncome * taxRate
}
```

### Fully Customizable UX

FormML employs a robust **model-view separation architecture** that cleanly decouples form logic from UI presentation. Domain experts define the form's structure, types, and behaviors (the "model") in a `.fml` file using **FormML DSL**.

This separation empowers developers to focus entirely on crafting polished, custom UI experiences (the "view") with the same flexibility as other form libraries, without worrying about the underlying business logic.

```js
import { ErrorMessage, Field, useFormML } from '@formml/react'
import tax from './tax.fml'

export default function App() {
  const { $form, FormML, handleSubmit } = useFormML(tax)
  const onSubmit = handleSubmit((data) => console.log(data))
  return (
    <FormML>
      <form onSubmit={onSubmit}>
        <label>Name</label>
        <Field $bind={$form.name} />
        <ErrorMessage $bind={$form.name} as="span" />

        {/* ... */}

        <button>Submit</button>
      </form>
    </FormML>
  )
}
```

### Out-of-the-box Dynamic Behavior Support

FormML treats dynamic behaviors as **first-class citizens**. It supports real-time calculations directly in its DSL, with **JavaScript expressions** or an **Excel-like formula** system (WIP). For instance, calculating `tax` based on input fields in above example is straightforward and requires minimal effort.

### Out-of-the-box Auto-save & Resume Support

FormML also treats auto-save & resume as **first-class citizens**. It plans to support state persistence, conflict resolution, data synchronization, progress tracking, and error recovery out-of-the-box.

## Looking Forward

While basic forms have largely been solved, enterprise-level forms continue to present unique challenges. FormML takes a step forward in addressing these persistent issues, offering a comprehensive solution that balances power, flexibility, and ease of use.

Whether you're struggling with complex calculations, dynamic behaviors, or collaboration between teams, FormML provides a framework designed specifically for enterprise-level form challenges.

Ready to tackle your enterprise form challenges? Follow my account on [X](https://x.com/jindong_z) or [Bluesky](https://bsky.app/profile/jindong-z.bsky.social), and try it out after the first release!
