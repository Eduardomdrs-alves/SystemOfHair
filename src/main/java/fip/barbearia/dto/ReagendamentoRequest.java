package fip.barbearia.dto;

import java.time.LocalDateTime;

public class ReagendamentoRequest {
    private LocalDateTime novaData;

    public LocalDateTime getNovaData() { return novaData; }
    public void setNovaData(LocalDateTime novaData) { this.novaData = novaData; }
}
