#!/bin/bash
# ESSE ARQUIVO É UM ALGORITMO PRA BLOQUEAR O SISTEMA.
# ELE TIRA UM PRINT COM O SCROT, APLICA O BLUR E BLOQUEIA COM ESSE PRINT COM BLUR
scrot /tmp/screen_locked.png
convert /tmp/screen_locked.png -blur 0x20 /tmp/screen_locked.png
i3lock -i /tmp/screen_locked.png
