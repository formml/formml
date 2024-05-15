import { FormML } from '../../FormML.js'
import validate from '../validate.js'

describe('validate', () => {
  describe('initial validation', () => {
    test('should do validation if given event name matches configured event', () => {
      // Arrange
      const mockedValidate = vi.fn()
      const form = {
        options: { validateOn: { initial: 'change' } },
        validate: mockedValidate,
      } as unknown as FormML
      const dummyIndex = {}
      const dummyContext = {} as ClassMethodDecoratorContext

      // Act
      const decorator = validate({ eventName: 'change' })
      const decoratedMethod = decorator(() => {}, dummyContext)
      decoratedMethod.call(form, dummyIndex)

      // Assert
      expect(mockedValidate).toBeCalledWith(dummyIndex)
    })

    test('should do validation after execution of original method', () => {
      // Arrange
      const executions: string[] = []
      const mockedValidate = vi.fn(() => executions.push('validate'))
      const mockedOriginalMethod = vi.fn(() => executions.push('original'))
      const form = {
        options: { validateOn: { initial: 'change' } },
        validate: mockedValidate,
      } as unknown as FormML
      const dummyIndex = {}
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
        options: { validateOn: { initial: 'change' } },
        validate: mockedValidate,
      } as unknown as FormML
      const dummyIndex = {}
      const dummyContext = {} as ClassMethodDecoratorContext

      // Act
      const decorator = validate({ eventName: 'submit' })
      const decoratedMethod = decorator(() => {}, dummyContext)
      decoratedMethod.call(form, dummyIndex)

      // Assert
      expect(mockedValidate).not.toBeCalled()
    })
  })
})
