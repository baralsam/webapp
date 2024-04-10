packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "~> 1"
    }
  }
}

source "googlecompute" "custom" {
  project_id          = "clod-assignment"
  source_image_family = "centos-stream-8"
  machine_type        = "e2-medium"
  image_name          = "custom-node-app-image-${formatdate("YYYY-MM-DD-hh-mm-ss", timestamp())}"
  image_description   = "Custom Image on CentOS Stream 8"
  image_family        = "centos-family"
  ssh_username        = "centos"
  zone                = "us-east1-c"
  use_internal_ip     = false
  network             = "default"
}

build {
  sources = ["googlecompute.custom"]

  provisioner "file" {
    source      = "./webapp.zip"
    destination = "/tmp/webapp.zip"
  }

  provisioner "file" {
    source      = "./csye6225.service"
    destination = "/tmp/csye6225.service"
  }

  provisioner "file" {
    source      = "./config.yaml"
    destination = "/tmp/config.yaml"
  }

  provisioner "shell" {
    script = "./setup.sh"
  }

  post-processor "manifest" {
    output     = "manifest.json"
    strip_path = true
  }
}
