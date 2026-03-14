const supabase = require('../utils/database');

class SupabaseService {
  // Faculty operations
  async getFacultyByName(name) {
    try {
      const { data, error } = await supabase
        .from('faculty')
        .select(`id, name, cabin_number, department, faculty_presence ( status, updated_at )`)
        .ilike('name', `%${name}%`)
        .limit(10);
        
      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }

      if (!data) return [];

      return data.map(faculty => ({
        id: faculty.id,
        name: faculty.name,
        cabin: faculty.cabin_number,
        department: faculty.department,
        status: faculty.faculty_presence?.[0]?.status || 'ABSENT',
        lastUpdated: faculty.faculty_presence?.[0]?.updated_at
      }));
    } catch (error) {
      console.error('Error in getFacultyByName:', error);
      throw error;
    }
  }

  async getFacultyById(facultyId) {
    try {
      const { data, error } = await supabase
        .from('faculty')
        .select(`
          id,
          name,
          cabin_number,
          department,
          faculty_presence (
            status,
            updated_at
          )
        `)
        .eq('id', facultyId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') { // Record not found
          return [];
        }
        console.error('Supabase error in getFacultyById:', error);
        throw new Error(error.message);
      }

      return [{
        id: data.id,
        name: data.name,
        cabin: data.cabin_number,
        department: data.department,
        status: data.faculty_presence?.status || 'ABSENT',
        lastUpdated: data.faculty_presence?.updated_at
      }];
    } catch (error) {
      console.error('Error in getFacultyById:', error);
      throw error;
    }
  }

  async updateFacultyStatus(facultyId, status) {
    try {
      // First, verify the faculty exists
      const { data: facultyData, error: facultyError } = await supabase
        .from('faculty')
        .select('id')
        .eq('id', facultyId)
        .single();

      if (facultyError || !facultyData) {
        throw new Error('Faculty member not found');
      }

      // Use insert with on conflict to handle both insert and update
      const { data, error } = await supabase
        .from('faculty_presence')
        .insert({
          faculty_id: facultyId,
          status,
          updated_at: new Date().toISOString()
        })
        .onConflict('faculty_id')
        .merge(); // This updates existing records

      if (error) {
        console.error('Supabase error in updateFacultyStatus:', error);
        throw new Error(error.message);
      }
      return data;
    } catch (error) {
      console.error('Error in updateFacultyStatus:', error);
      throw error;
    }
  }
}

module.exports = new SupabaseService();