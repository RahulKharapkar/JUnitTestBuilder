export const SAMPLE_TESTS = [
    {
      name: 'Calculator',
      data: {
        className: 'Calculator',
        methodName: 'divide',
        dependencies: [],
        codeSnippet: `public class Calculator {
      public double divide(double numerator, double denominator) {
          if (denominator == 0) {
              throw new ArithmeticException("Division by zero");
          }
          return numerator / denominator;
      }
  }`,
        expectedBehavior: 'The method should perform division of two numbers. It should throw an ArithmeticException when attempting to divide by zero.'
      }
    },

    {
      name: 'User Service',
      data: {
        className: 'UserService',
        methodName: 'createUser',
        dependencies: ['UserRepository', 'EmailService'],
        codeSnippet: `public class UserService {
      private final UserRepository userRepository;
      private final EmailService emailService;
  
      public UserService(UserRepository userRepository, EmailService emailService) {
          this.userRepository = userRepository;
          this.emailService = emailService;
      }
  
      public User createUser(String email, String name) {
          if (!isValidEmail(email)) {
              throw new IllegalArgumentException("Invalid email format");
          }
          
          User user = new User(email, name);
          userRepository.save(user);
          emailService.sendWelcomeEmail(user);
          
          return user;
      }
  
      private boolean isValidEmail(String email) {
          return email != null && email.contains("@");
      }
  }`,
        expectedBehavior: 'The service should create a new user, save it to the repository, and send a welcome email. It should validate the email format and throw an exception for invalid emails.'
      }
    }
  ] as const;