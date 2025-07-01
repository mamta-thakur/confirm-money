import { UserData } from '../utils/csvExport';

// Mock API service for user management
class UserService {
  private baseURL = 'https://api.example.com'; // Replace with your actual API endpoint

  // Get all users from localStorage (mock data)
  getAllUsers(): UserData[] {
    try {
      const userDetails = localStorage.getItem('userDetails');
      const registeredUsers = localStorage.getItem('registeredUsers');
      
      const users: UserData[] = [];
      
      // Get main user details
      if (userDetails) {
        const userData = JSON.parse(userDetails);
        users.push({
          id: userData.mobile || Math.random().toString(36).substr(2, 9),
          mobile: userData.mobile || '',
          name: userData.name,
          gender: userData.gender,
          dob: userData.dob,
          profession: userData.profession,
          income: userData.income,
          pan: userData.pan,
          aadhar: userData.aadhar,
          loanType: userData.loanType,
          loanPurpose: userData.loanPurpose,
          loanAmount: userData.loanAmount,
          tenure: userData.tenure,
          registrationDate: new Date().toISOString(),
          isAuthenticated: userData.isAuthenticated || false
        });
      }

      // Get registered users (mobile numbers only)
      if (registeredUsers) {
        const mobileNumbers = JSON.parse(registeredUsers);
        mobileNumbers.forEach((mobile: string) => {
          if (!users.find(user => user.mobile === mobile)) {
            users.push({
              id: Math.random().toString(36).substr(2, 9),
              mobile,
              registrationDate: new Date().toISOString(),
              isAuthenticated: false
            });
          }
        });
      }

      // Add some mock data for demonstration
      const mockUsers: UserData[] = [
        {
          id: 'user_001',
          mobile: '9876543210',
          name: 'Rajesh Kumar',
          gender: 'Male',
          dob: '1990-05-15',
          profession: 'Salaried',
          income: 50000,
          pan: 'ABCDE1234F',
          aadhar: '123456789012',
          loanType: 'Personal Loan',
          loanPurpose: 'Personal',
          loanAmount: 200000,
          tenure: 24,
          registrationDate: '2024-01-15T10:30:00Z',
          isAuthenticated: true
        },
        {
          id: 'user_002',
          mobile: '9876543211',
          name: 'Priya Sharma',
          gender: 'Female',
          dob: '1985-08-22',
          profession: 'Self Employed - Business',
          income: 75000,
          pan: 'FGHIJ5678K',
          aadhar: '987654321098',
          loanType: 'Business Loan',
          loanPurpose: 'Business',
          loanAmount: 500000,
          tenure: 36,
          registrationDate: '2024-01-20T14:45:00Z',
          isAuthenticated: true
        },
        {
          id: 'user_003',
          mobile: '9876543212',
          name: 'Amit Patel',
          gender: 'Male',
          dob: '1992-12-10',
          profession: 'Salaried',
          income: 40000,
          pan: 'KLMNO9012P',
          aadhar: '456789012345',
          loanType: 'Personal Loan',
          loanPurpose: 'Emergency / Medical',
          loanAmount: 100000,
          tenure: 18,
          registrationDate: '2024-02-01T09:15:00Z',
          isAuthenticated: true
        },
        {
          id: 'user_004',
          mobile: '9876543213',
          registrationDate: '2024-02-05T16:20:00Z',
          isAuthenticated: false
        }
      ];

      return [...users, ...mockUsers];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  // Fetch users from API (for real implementation)
  async fetchUsersFromAPI(): Promise<UserData[]> {
    try {
      // Uncomment and modify for real API integration
      const response = await fetch(`${this.baseURL}/users`);
      if (!response.ok) throw new Error('Failed to fetch users');
      return await response.json();
      
      // For now, return local data
    //   return this.getAllUsers();
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to fetch users from server');
    }
  }

  // Export users data (could be enhanced to call API endpoint)
  async exportUsersData(): Promise<UserData[]> {
    try {
      // In a real implementation, you might call a specific export endpoint
      // const response = await fetch(`${this.baseURL}/users/export`);
      // return await response.json();
      
      return this.getAllUsers();
    } catch (error) {
      console.error('Export Error:', error);
      throw new Error('Failed to export user data');
    }
  }

  // Get user statistics
  getUserStats(users: UserData[]) {
    const totalUsers = users.length;
    const verifiedUsers = users.filter(user => user.isAuthenticated).length;
    const pendingUsers = totalUsers - verifiedUsers;
    
    const totalLoanAmount = users
      .filter(user => user.loanAmount)
      .reduce((sum, user) => sum + (user.loanAmount || 0), 0);
    
    const avgLoanAmount = totalLoanAmount / users.filter(user => user.loanAmount).length || 0;

    return {
      totalUsers,
      verifiedUsers,
      pendingUsers,
      totalLoanAmount,
      avgLoanAmount
    };
  }
}

export default new UserService();