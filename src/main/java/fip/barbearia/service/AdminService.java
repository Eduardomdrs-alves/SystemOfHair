package fip.barbearia.service;

import fip.barbearia.entity.Admin;
import fip.barbearia.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin saveAdmin(Admin admin) {
        try {
            return adminRepository.save(admin);
        } catch (Exception e) {
            System.out.println("Erro ao salvar admin: " + e.getMessage());
            return null;
        }
    }

    public Admin getAdminById(Long id) {
        try {
            return adminRepository.findById(id).orElse(null);
        } catch (Exception e) {
            System.out.println("Erro ao buscar admin por ID: " + e.getMessage());
            return null;
        }
    }

    public List<Admin> getAllAdmin() {
        try {
            return adminRepository.findAll();
        } catch (Exception e) {
            System.out.println("Erro ao buscar todos os admins: " + e.getMessage());
            return null;
        }
    }

    public Admin getAdminByEmail(String email) {
        try {
            return adminRepository.findByEmail(email).orElse(null);
        } catch (Exception e) {
            System.out.println("Erro ao buscar admin por e-mail: " + e.getMessage());
            return null;
        }
    }

    public Admin updateAdmin(Long id, Admin dados) {
        try {
            Admin existente = getAdminById(id);

            if (existente != null) {
                existente.setNome(dados.getNome());
                existente.setEmail(dados.getEmail());
                existente.setTelefone(dados.getTelefone());
                existente.setSenha(dados.getSenha());
                return adminRepository.save(existente);
            }

            return null;

        } catch (Exception e) {
            System.out.println("Erro ao atualizar admin: " + e.getMessage());
            return null;
        }
    }

    public void deleteAdmin(Long id) {
        try {
            adminRepository.deleteById(id);
        } catch (Exception e) {
            System.out.println("Erro ao deletar admin: " + e.getMessage());
        }
    }
}
