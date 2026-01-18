// src/hooks/useResume.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { resumeAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export const useResume = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Upload Resume
  const uploadResume = useMutation({
    mutationFn: (file: File) => resumeAPI.uploadResume(file),
    onSuccess: (response) => {
      toast({
        title: 'Resume uploaded!',
        description: 'Your resume has been uploaded successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      return response.data;
    },
    onError: (error: any) => {
      toast({
        title: 'Upload failed',
        description: error.response?.data?.message || 'Could not upload resume',
        variant: 'destructive',
      });
    },
  });

  // Analyze Resume
  const analyzeResume = useMutation({
    mutationFn: (resumeId: string) => resumeAPI.analyzeResume(resumeId),
    onSuccess: () => {
      toast({
        title: 'Analysis started!',
        description: 'Your resume is being analyzed.',
      });
      queryClient.invalidateQueries({ queryKey: ['resume-analysis'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Analysis failed',
        description: error.response?.data?.message || 'Could not analyze resume',
        variant: 'destructive',
      });
    },
  });

  // Get All Resumes
  const { data: resumes, isLoading: resumesLoading } = useQuery({
    queryKey: ['resumes'],
    queryFn: async () => {
      const response = await resumeAPI.getAllResumes();
      return response.data;
    },
  });

  // Get Resume Analysis
  const getResumeAnalysis = (resumeId: string) => {
    return useQuery({
      queryKey: ['resume-analysis', resumeId],
      queryFn: async () => {
        const response = await resumeAPI.getResumeAnalysis(resumeId);
        return response.data;
      },
      enabled: !!resumeId,
    });
  };

  // Delete Resume
  const deleteResume = useMutation({
    mutationFn: (resumeId: string) => resumeAPI.deleteResume(resumeId),
    onSuccess: () => {
      toast({
        title: 'Resume deleted',
        description: 'Your resume has been removed.',
      });
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Delete failed',
        description: error.response?.data?.message || 'Could not delete resume',
        variant: 'destructive',
      });
    },
  });

  // Update Resume
  const updateResume = useMutation({
    mutationFn: ({ resumeId, data }: { resumeId: string; data: any }) => 
      resumeAPI.updateResume(resumeId, data),
    onSuccess: () => {
      toast({
        title: 'Resume updated',
        description: 'Your resume has been updated successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Update failed',
        description: error.response?.data?.message || 'Could not update resume',
        variant: 'destructive',
      });
    },
  });

  return {
    uploadResume,
    analyzeResume,
    deleteResume,
    updateResume,
    getResumeAnalysis,
    resumes,
    resumesLoading,
  };
};