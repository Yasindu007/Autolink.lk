import React, { useState } from 'react';
import { Upload, Download, FileText, Check, X, Clock, AlertCircle, Eye, Share, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

export function DocumentCenter() {
  const [selectedOrder] = useState('ORD-2024-001');
  
  const documentCategories = [
    {
      id: 'purchase',
      name: 'Purchase Documents',
      description: 'Vehicle purchase and auction documents',
      required: true
    },
    {
      id: 'shipping',
      name: 'Shipping Documents',
      description: 'Bill of lading and shipping manifests',
      required: true
    },
    {
      id: 'customs',
      name: 'Customs Documents',
      description: 'Import permits and customs declarations',
      required: true
    },
    {
      id: 'registration',
      name: 'Registration Papers',
      description: 'Vehicle registration certificates',
      required: false
    },
    {
      id: 'personal',
      name: 'Personal Documents',
      description: 'Your identification and supporting documents',
      required: true
    }
  ];

  const documents = [
    {
      id: 1,
      name: 'Purchase Invoice',
      category: 'purchase',
      type: 'PDF',
      size: '2.4 MB',
      uploadDate: '2023-12-01',
      status: 'verified',
      downloadUrl: '#',
      description: 'Original purchase invoice from Japanese dealer',
      required: true
    },
    {
      id: 2,
      name: 'Auction Sheet',
      category: 'purchase',
      type: 'PDF',
      size: '1.8 MB',
      uploadDate: '2023-12-01',
      status: 'verified',
      downloadUrl: '#',
      description: 'Detailed vehicle condition report from auction',
      required: true
    },
    {
      id: 3,
      name: 'Export Certificate',
      category: 'purchase',
      type: 'PDF',
      size: '1.2 MB',
      uploadDate: '2023-12-02',
      status: 'verified',
      downloadUrl: '#',
      description: 'Certificate of export from Japan',
      required: true
    },
    {
      id: 4,
      name: 'Bill of Lading',
      category: 'shipping',
      type: 'PDF',
      size: '956 KB',
      uploadDate: '2023-12-05',
      status: 'pending',
      downloadUrl: '#',
      description: 'Shipping document from carrier',
      required: true
    },
    {
      id: 5,
      name: 'Shipping Manifest',
      category: 'shipping',
      type: 'PDF',
      size: '1.1 MB',
      uploadDate: '2023-12-05',
      status: 'pending',
      downloadUrl: '#',
      description: 'Detailed cargo manifest',
      required: true
    },
    {
      id: 6,
      name: 'Import Permit',
      category: 'customs',
      type: 'PDF',
      size: '800 KB',
      uploadDate: '2023-12-08',
      status: 'pending',
      downloadUrl: '#',
      description: 'Sri Lankan import permit',
      required: true
    },
    {
      id: 7,
      name: 'NIC Copy',
      category: 'personal',
      type: 'PDF',
      size: '650 KB',
      uploadDate: '2023-12-01',
      status: 'verified',
      downloadUrl: '#',
      description: 'Copy of National Identity Card',
      required: true
    },
    {
      id: 8,
      name: 'Bank Statement',
      category: 'personal',
      type: 'PDF',
      size: '1.3 MB',
      uploadDate: '2023-11-30',
      status: 'rejected',
      downloadUrl: '#',
      description: 'Last 3 months bank statements',
      required: true,
      rejectionReason: 'Document is older than 3 months'
    }
  ];

  const auditTrail = [
    {
      id: 1,
      action: 'Document Uploaded',
      document: 'Purchase Invoice',
      user: 'Customer',
      timestamp: '2023-12-01 10:30 AM',
      details: 'Original purchase invoice uploaded'
    },
    {
      id: 2,
      action: 'Document Verified',
      document: 'Purchase Invoice',
      user: 'AutoLink Staff',
      timestamp: '2023-12-01 02:15 PM',
      details: 'Document verified and approved'
    },
    {
      id: 3,
      action: 'Document Rejected',
      document: 'Bank Statement',
      user: 'AutoLink Staff',
      timestamp: '2023-12-02 11:45 AM',
      details: 'Document rejected - outdated'
    },
    {
      id: 4,
      action: 'Escrow Release Triggered',
      document: 'All Purchase Documents',
      user: 'System',
      timestamp: '2023-12-02 03:30 PM',
      details: 'All purchase documents verified, escrow release initiated'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-600" />;
      case 'rejected':
        return <X className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800">Pending Review</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="outline">Not Uploaded</Badge>;
    }
  };

  const getCategoryProgress = (categoryId: string) => {
    const categoryDocs = documents.filter(doc => doc.category === categoryId);
    const verifiedDocs = categoryDocs.filter(doc => doc.status === 'verified');
    return categoryDocs.length > 0 ? (verifiedDocs.length / categoryDocs.length) * 100 : 0;
  };

  const getOverallProgress = () => {
    const requiredDocs = documents.filter(doc => doc.required);
    const verifiedRequired = requiredDocs.filter(doc => doc.status === 'verified');
    return requiredDocs.length > 0 ? (verifiedRequired.length / requiredDocs.length) * 100 : 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Center</h1>
        <p className="text-gray-600">Manage and track all documents for order {selectedOrder}</p>
      </div>

      {/* Overall Progress */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Document Verification Progress</span>
            <span className="text-sm font-normal">{Math.round(getOverallProgress())}% Complete</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={getOverallProgress()} className="h-3 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {documents.filter(doc => doc.status === 'verified').length}
              </div>
              <div className="text-sm text-gray-600">Verified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">
                {documents.filter(doc => doc.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {documents.filter(doc => doc.status === 'rejected').length}
              </div>
              <div className="text-sm text-gray-600">Rejected</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          {documentCategories.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      {category.name}
                      {category.required && <Badge variant="outline" className="ml-2">Required</Badge>}
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {Math.round(getCategoryProgress(category.id))}% Complete
                    </div>
                    <Progress value={getCategoryProgress(category.id)} className="w-24 h-2 mt-1" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents
                    .filter(doc => doc.category === category.id)
                    .map((document) => (
                      <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            {getStatusIcon(document.status)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium">{document.name}</h3>
                              {getStatusBadge(document.status)}
                            </div>
                            <p className="text-sm text-gray-600">{document.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                              <span>{document.type}</span>
                              <span>{document.size}</span>
                              {document.uploadDate && <span>Uploaded: {document.uploadDate}</span>}
                            </div>
                            {document.status === 'rejected' && document.rejectionReason && (
                              <Alert className="mt-2">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="text-sm">
                                  Rejected: {document.rejectionReason}
                                </AlertDescription>
                              </Alert>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{document.name}</DialogTitle>
                                <DialogDescription>
                                  Document preview and details
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                                  <FileText className="h-16 w-16 text-gray-400" />
                                </div>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span>Status:</span>
                                    {getStatusBadge(document.status)}
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Size:</span>
                                    <span>{document.size}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Upload Date:</span>
                                    <span>{document.uploadDate}</span>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Upload Tab */}
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Document</CardTitle>
              <CardDescription>
                Upload documents for verification and processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Drop files here or click to browse</h3>
                  <p className="text-gray-600 mb-4">Supported formats: PDF, JPG, PNG (Max 10MB)</p>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Required Documents Still Needed:</h4>
                  <div className="space-y-2">
                    {documents
                      .filter(doc => doc.required && doc.status !== 'verified')
                      .map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <div>
                            <h5 className="font-medium">{doc.name}</h5>
                            <p className="text-sm text-gray-600">{doc.description}</p>
                          </div>
                          <Button size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    All documents will be reviewed within 24 hours. Escrow release is automatically triggered when all required documents are verified.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Trail Tab */}
        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Document Audit Trail</CardTitle>
              <CardDescription>
                Complete history of document activities and escrow triggers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditTrail.map((entry, index) => (
                  <div key={entry.id} className="relative flex items-start pb-4">
                    {index !== auditTrail.length - 1 && (
                      <div className="absolute left-4 top-8 w-0.5 h-16 bg-gray-200" />
                    )}
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-blue-600 rounded-full" />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{entry.action}</h3>
                        <span className="text-sm text-gray-500">{entry.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Document: {entry.document} • By: {entry.user}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{entry.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}