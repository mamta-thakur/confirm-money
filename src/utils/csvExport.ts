export interface UserData {
  id: string;
  mobile: string;
  name?: string;
  gender?: string;
  dob?: string;
  profession?: string;
  income?: number;
  pan?: string;
  aadhar?: string;
  loanType?: string;
  loanPurpose?: string;
  loanAmount?: number;
  tenure?: number;
  registrationDate: string;
  isAuthenticated: boolean;
}

export const convertToCSV = (data: UserData[]): string => {
  if (data.length === 0) return '';

  const headers = [
    'ID',
    'Mobile Number',
    'Name',
    'Gender',
    'Date of Birth',
    'Profession',
    'Monthly Income',
    'PAN',
    'Aadhar',
    'Loan Type',
    'Loan Purpose',
    'Loan Amount',
    'Tenure (months)',
    'Registration Date',
    'Status'
  ];

  const csvContent = [
    headers.join(','),
    ...data.map(user => [
      user.id,
      user.mobile,
      user.name || '',
      user.gender || '',
      user.dob || '',
      user.profession || '',
      user.income || '',
      user.pan || '',
      user.aadhar || '',
      user.loanType || '',
      user.loanPurpose || '',
      user.loanAmount || '',
      user.tenure || '',
      user.registrationDate,
      user.isAuthenticated ? 'Verified' : 'Pending'
    ].map(field => `"${field}"`).join(','))
  ].join('\n');

  return csvContent;
};

export const downloadCSV = (csvContent: string, filename: string = 'users_data.csv'): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
};