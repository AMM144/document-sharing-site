
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { List, ListItem } from '@/components/ui/list';

export default function DocumentSharing() {
  const [files, setFiles] = useState([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  const handleDownload = (file) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogin = () => {
    if (password === 'your_password') setIsAuthenticated(true);
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      {!isAuthenticated ? (
        <Card className="max-w-md mx-auto">
          <CardContent>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="mt-2 w-full" onClick={handleLogin}>
              Login
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Input type="file" multiple onChange={handleFileUpload} />
            <Input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <List>
            {filteredFiles.map((file, index) => (
              <ListItem key={index} className="flex justify-between">
                <span>{file.name}</span>
                <Button size="sm" onClick={() => handleDownload(file)}>
                  Download
                </Button>
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
}
