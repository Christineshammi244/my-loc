import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'

export default async function Home() {
  const users = await prisma.User.findMany()
  async function addUser(formData) {
    'use server'
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.User.create({
      data: { 
        name: formData.get('name'), 
        email: formData.get('email'), 
        password:hashedPassword 

      }
    })
    revalidatePath('/')
  }
  async function updateUser(formData) {
    'use server'
    const id = formData.get('id')
    const newName = formData.get('name')

    await prisma.User.update({
      where: { id: parseInt(id) },
      data: { name: newName } 
    })
    revalidatePath('/')
  }

  async function deleteUser(formData) {
    'use server'
    await prisma.User.delete({
      where: { id: parseInt(formData.get('id')) }
    })
    revalidatePath('/')
  }

  return (
    <main style={{ padding: '50px', direction: 'rtl', fontFamily: 'sans-serif' }}>
      <h1>إدارة المستخدمين (CRUD)</h1>
      
      {/* فورم الإضافة */}
      <section style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px' }}>
        <h3>إضافة مستخدم جديد</h3>
        <form action={addUser} style={{ display: 'flex', gap: '10px' }}>
          <input type="text" name="name" placeholder="الاسم" required />
          <input type="email" name="email" placeholder="الإيميل" required />
          <input type="password" name="password" placeholder="الباسورد" required />
          <button type="submit">إضافة</button>
        </form>
      </section>

      <hr style={{ margin: '40px 0' }} />

      <h2>المستخدمون الحاليون:</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map((user) => (
          <li key={user.id} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '15px', borderBottom: '1px solid #ddd' }}>
            
            {/* عرض البيانات مع فورم التعديل السريع */}
            <form action={updateUser} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input type="hidden" name="id" value={user.id} />
              <input 
                type="text" 
                name="name" 
                defaultValue={user.name} 
                style={{ padding: '5px', border: '1px solid #ccc' }}
              />
              <span style={{ fontSize: '14px', color: '#666' }}>({user.email})</span>
              <button type="submit" style={{ backgroundColor: '#ffc107', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
                تحديث الاسم
              </button>
            </form>

            {/* زر الحذف */}
            <form action={deleteUser}>
              <input type="hidden" name="id" value={user.id} />
              <button type="submit" style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
                حذف
              </button>
            </form>

          </li>
        ))}
      </ul>
    </main>
  )
}