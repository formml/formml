import { FormML } from '../../FormML.js'
import { AnyIndex } from '../../IndexManager.js'
import validate from '../validate.js'

describe('validate', () => {
  describe('initial validation', () => {
    test('should do validation if given event name matches configured event', () => {
      // Arrange
      const mockedValidate = vi.fn()
      const form = {
        getField: () => ({ _internalState: { isInitiallyValidated: false } }),
        options: { preValidateOn: { initial: 'change' } },
        validate: mockedValidate,
      } as unknown as FormML
      const dummyIndex = {} as AnyIndex
      const dummyContext = {} as ClassMethodDecoratorContext

      // Act
      const decorator = validate({ eventName: 'change' })
      const decoratedMethod = decorator(() => {}, dummyContext)
      decoratedMethod.call(form, dummyIndex)

      // Assert
      expect(mockedValidate).toBeCalledWith(dummyIndex)
    })

    test.each(['change', 'blur', 'none'] as const)(
      'should always do validation if configured event is all',
      (eventName) => {
        // Arrange
        const mockedValidate = vi.fn()
        const form = {
          getField: () => ({ _internalState: { isInitiallyValidated: false } }),
          options: { preValidateOn: { initial: 'all' } },
          validate: mockedValidate,
        } as unknown as FormML
        const dummyIndex = {} as AnyIndex
        const dummyContext = {} as ClassMethodDecoratorContext

        // Act
        const decorator = validate({ eventName })
        const decoratedMethod = decorator(() => {}, dummyContext)
        decoratedMethod.call(form, dummyIndex)

        // Assert
        expect(mockedValidate).toBeCalledWith(dummyIndex)
      },
    )

    test('should do validation after execution of original method', () => {
      // Arrange
      const executions: string[] = []
      const mockedValidate = vi.fn(() => executions.push('validate'))
      const mockedOriginalMethod = vi.fn(() => executions.push('original'))
      const form = {
        getField: () => ({ _internalState: { isInitiallyValidated: false } }),
        options: { preValidateOn: { initial: 'change' } },
        validate: mockedValidate,
      } as unknown as FormML
      const dummyIndex = {} as AnyIndex
      const dummyContext = {} as ClassMethodDecoratorContext

      // Act
      const decorator = validate({ eventName: 'change' })
      const decoratedMethod = decorator(mockedOriginalMethod, dummyContext)
      decoratedMethod.call(form, dummyIndex)

      // Assert
      expect(executions).toEqual(['original', 'validate'])
    })

    test('should not do validation if given event name do not match configured event', () => {
      // Arrange
      const mockedValidate = vi.fn()
      const form = {
        getField: () => ({ _internalState: { isInitiallyValidated: false } }),
        options: { preValidateOn: { initial: 'change' } },
        validate: mockedValidate,
      } as unknown as FormML
      const dummyIndex = {} as AnyIndex
      const dummyContext = {} as ClassMethodDecoratorContext

      // Act
      const decorator = validate({ eventName: 'none' })
      const decoratedMethod = decorator(() => {}, dummyContext)
      decoratedMethod.call(form, dummyIndex)

      // Assert
      expect(mockedValidate).not.toBeCalled()
    })

    test('should not do validation if event name matches but it is not initial validation', () => {
      // Arrange
      const mockedValidate = vi.fn()
      const form = {
        getField: () => ({ _internalState: { isInitiallyValidated: true } }),
        options: { preValidateOn: { initial: 'change', subsequent: 'blur' } },
        validate: mockedValidate,
      } as unknown as FormML
      const dummyIndex = {} as AnyIndex
      const dummyContext = {} as ClassMethodDecoratorContext

      const decorator = validate({ eventName: 'change' })
      const decoratedMethod = decorator(() => {}, dummyContext)

      // Act
      decoratedMethod.call(form, dummyIndex)

      // Assert
      expect(mockedValidate).not.toBeCalled()
    })
  })

  describe('subsequent validation', () => {
    test('should do validation if given event name matches configured event', () => {
      // Arrange
      const mockedValidate = vi.fn()
      const form = {
        getField: () => ({ _internalState: { isInitiallyValidated: true } }),
        options: { preValidateOn: { initial: 'change', subsequent: 'blur' } },
        validate: mockedValidate,
      } as unknown as FormML
      const dummyIndex = {} as AnyIndex
      const dummyContext = {} as ClassMethodDecoratorContext

      // Act
      const decorator = validate({ eventName: 'blur' })
      const decoratedMethod = decorator(() => {}, dummyContext)
      decoratedMethod.call(form, dummyIndex)

      // Assert
      expect(mockedValidate).toBeCalledWith(dummyIndex)
    })

    test.each(['change', 'blur', 'none'] as const)(
      'should always do validation if configured event is all',
      (eventName) => {
        // Arrange
        const mockedValidate = vi.fn()
        const form = {
          getField: () => ({ _internalState: { isInitiallyValidated: true } }),
          options: { preValidateOn: { initial: 'change', subsequent: 'all' } },
          validate: mockedValidate,
        } as unknown as FormML
        const dummyIndex = {} as AnyIndex
        const dummyContext = {} as ClassMethodDecoratorContext

        // Act
        const decorator = validate({ eventName })
        const decoratedMethod = decorator(() => {}, dummyContext)
        decoratedMethod.call(form, dummyIndex)

        // Assert
        expect(mockedValidate).toBeCalledWith(dummyIndex)
      },
    )

    test('should not do validation if given event name do not match configured event', () => {
      // Arrange
      const mockedValidate = vi.fn()
      const form = {
        getField: () => ({ _internalState: { isInitiallyValidated: true } }),
        options: { preValidateOn: { initial: 'change', subsequent: 'blur' } },
        validate: mockedValidate,
      } as unknown as FormML
      const dummyIndex = {} as AnyIndex
      const dummyContext = {} as ClassMethodDecoratorContext

      // Act
      const decorator = validate({ eventName: 'change' })
      const decoratedMethod = decorator(() => {}, dummyContext)
      decoratedMethod.call(form, dummyIndex)

      // Assert
      expect(mockedValidate).not.toBeCalled()
    })

    test('should not do validation if event name matches but it is not subsequent validation', () => {
      // Arrange
      const mockedValidate = vi.fn()
      const form = {
        getField: () => ({ _internalState: { isInitiallyValidated: false } }),
        options: { preValidateOn: { initial: 'change', subsequent: 'blur' } },
        validate: mockedValidate,
      } as unknown as FormML
      const dummyIndex = {} as AnyIndex
      const dummyContext = {} as ClassMethodDecoratorContext

      const decorator = validate({ eventName: 'blur' })
      const decoratedMethod = decorator(() => {}, dummyContext)

      // Act
      decoratedMethod.call(form, dummyIndex)

      // Assert
      expect(mockedValidate).not.toBeCalled()
    })
  })
})
