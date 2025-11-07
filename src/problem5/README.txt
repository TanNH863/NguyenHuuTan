# curl command for database population (role: admin, user, manager)
curl -X POST -H "Content-Type: application/json" -d '{"email": "alice.nguyen@example.com", "password": "passAlice123", "full_name": "Alice Nguyen", "role": "admin"}' http://localhost:3063/user/
curl -X POST -H "Content-Type: application/json" -d '{"email": "bob.tran@example.com", "password": "bobSecure99", "full_name": "Bob Tran", "role": "user"}' http://localhost:3063/user/
curl -X POST -H "Content-Type: application/json" -d '{"email": "charlie.le@example.com", "password": "charliePwd!", "full_name": "Charlie Le", "role": "manager"}' http://localhost:3063/user/
curl -X POST -H "Content-Type: application/json" -d '{"email": "diana.vo@example.com", "password": "Diana@2024", "full_name": "Diana Vo", "role": "user"}' http://localhost:3063/user/
curl -X POST -H "Content-Type: application/json" -d '{"email": "edward.pham@example.com", "password": "Ed123456", "full_name": "Edward Pham", "role": "admin"}' http://localhost:3063/user/
curl -X POST -H "Content-Type: application/json" -d '{"email": "fiona.dang@example.com", "password": "Fi0naPass", "full_name": "Fiona Dang", "role": "user"}' http://localhost:3063/user/
curl -X POST -H "Content-Type: application/json" -d '{"email": "george.vo@example.com", "password": "Geo2025!", "full_name": "George Vo", "role": "user"}' http://localhost:3063/user/
curl -X POST -H "Content-Type: application/json" -d '{"email": "hannah.truong@example.com", "password": "HanPass2024", "full_name": "Hannah Truong", "role": "manager"}' http://localhost:3063/user/
curl -X POST -H "Content-Type: application/json" -d '{"email": "ian.ngo@example.com", "password": "ianPwd!23", "full_name": "Ian Ngo", "role": "user"}' http://localhost:3063/user/
curl -X POST -H "Content-Type: application/json" -d '{"email": "julia.ly@example.com", "password": "JuliaSecure1", "full_name": "Julia Ly", "role": "admin"}' http://localhost:3063/user/
curl -X POST -H "Content-Type: application/json" -d '{"email": "kevin.bui@example.com", "password": "Kev!n123", "full_name": "Kevin Bui", "role": "user"}' http://localhost:3063/user/
curl -X POST -H "Content-Type: application/json" -d '{"email": "lisa.hoang@example.com", "password": "LisaHo@456", "full_name": "Lisa Hoang", "role": "manager"}' http://localhost:3063/user/
curl -X POST -H "Content-Type: application/json" -d '{"email": "michael.nguyen@example.com", "password": "Mike2025#", "full_name": "Michael Nguyen", "role": "user"}' http://localhost:3063/user/
curl -X POST -H "Content-Type: application/json" -d '{"email": "nina.pham@example.com", "password": "Nina1234", "full_name": "Nina Pham", "role": "user"}' http://localhost:3063/user/
curl -X POST -H "Content-Type: application/json" -d '{"email": "oscar.tran@example.com", "password": "Oscar!2024", "full_name": "Oscar Tran", "role": "admin"}' http://localhost:3063/user/
curl -X POST -H "Content-Type: application/json" -d '{"email": "paula.le@example.com", "password": "PaulaPass@", "full_name": "Paula Le", "role": "user"}' http://localhost:3063/user/
curl -X POST -H "Content-Type: application/json" -d '{"email": "quang.do@example.com", "password": "Qd@12345", "full_name": "Quang Do", "role": "manager"}' http://localhost:3063/user/
curl -X POST -H "Content-Type: application/json" -d '{"email": "rachel.ngo@example.com", "password": "Rachel!99", "full_name": "Rachel Ngo", "role": "user"}' http://localhost:3063/user/
curl -X POST -H "Content-Type: application/json" -d '{"email": "steven.truong@example.com", "password": "StevePwd!5", "full_name": "Steven Truong", "role": "user"}' http://localhost:3063/user/
curl -X POST -H "Content-Type: application/json" -d '{"email": "tina.vo@example.com", "password": "Tina2024#", "full_name": "Tina Vo", "role": "admin"}' http://localhost:3063/user/

# curl command for updating user's email
curl -X PATCH -H "Content-Type: application/json" -d '{"email": ""}' http://localhost:3063/user/<id>

# curl command for updating whole user data
curl -X PUT -H "Content-Type: application/json" -d '{"email": "", "password": "", "full_name": "", "role": ""}' http://localhost:3063/user/<id>

# curl command for creating a new user
curl -X POST -H "Content-Type: application/json" -d '{"email": "", "password": "", "full_name": "", "role": ""}' http://localhost:3063/user/

# curl command for deleting an existing user
curl -X DELETE -H "Content-Type: application/json" -d http://localhost:3063/user/<id>

# curl command for retrieving all users (with and without filters)
curl -X GET -H "Content-Type: application/json" -d http://localhost:3063/users
curl -X GET -H "Content-Type: application/json" -d http://localhost:3063/users?role=manager&sort=asc
curl -X GET -H "Content-Type: application/json" -d http://localhost:3063/users?sort=desc